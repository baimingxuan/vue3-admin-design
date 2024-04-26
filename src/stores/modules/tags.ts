import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'
import { defineStore } from 'pinia'
import { unref, toRaw } from 'vue'
import { stores } from '@/stores'
import { getRawRoute } from '@/utils'
import { APP_TAGS_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'
import { useGo, useReload } from '@/hooks/web/usePage'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

interface TagsState {
  visitedTags: RouteLocationNormalized[]
  cachedTags: Set<string>
}

function handleGotoPage(router: Router) {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

const getToTarget = (tagItem: RouteLocationNormalized) => {
  const { path, params, query } = tagItem
  return {
    path,
    params: params || {},
    query: query || {}
  }
}

export const useTagStore = defineStore('app-tags', {
  persist: true,
  state: (): TagsState => {
    const { getTagsCached } = useBaseSetting()

    return {
      visitedTags: unref(getTagsCached) ? Persistent.getLocal(APP_TAGS_KEY) || [] : [],
      cachedTags: new Set()
    }
  },
  getters: {
    getVisitedTags(): RouteLocationNormalized[] {
      return this.visitedTags
    },
    getCachedTags(): string[] {
      return Array.from(this.cachedTags)
    }
  },
  actions: {
    async addVisitedTags(route: RouteLocationNormalized) {
      const { path, fullPath, params, query } = getRawRoute(route)
      const { getTagsCached } = useBaseSetting()

      let updateIndex = -1
      // Existing tag, do not add tag repeatedly
      const tagHasExits = this.visitedTags.some((tag, index) => {
        updateIndex = index
        return (tag.fullPath || tag.path) === (fullPath || path)
      })

      // If the tag already exists, perform the update operation
      if (tagHasExits) {
        const currTag = toRaw(this.visitedTags)[updateIndex]

        if (!currTag) return

        currTag.params = params || currTag.params
        currTag.query = query || currTag.query
        currTag.fullPath = fullPath || currTag.fullPath
        this.visitedTags.splice(updateIndex, 1, currTag)
      } else {
        // Add tag
        this.visitedTags.push(route)
      }

      this.updateCachedTags()

      unref(getTagsCached) && Persistent.setLocal(APP_TAGS_KEY, this.visitedTags)
    },

    // Update the cached tags according to the currently opened tags
    updateCachedTags() {
      const cachedMap: Set<string> = new Set()

      for (const tag of this.visitedTags) {
        const tagItem = getRawRoute(tag)

        // Ignore the cache
        const needCache = !tagItem.meta?.ignoreKeepAlive
        if (!needCache) continue

        const routeName = tagItem.name as string
        cachedMap.add(routeName)
      }

      this.cachedTags = cachedMap
    },

    gotToPage(router: Router) {
      const go = useGo(router)
      const tagsLen = this.visitedTags.length
      const { path } = unref(router.currentRoute)

      let toPath: string = '/home'

      if (tagsLen > 0) {
        const currPage = this.visitedTags[tagsLen - 1]
        const currPath = currPage.fullPath || currPage.path
        if (currPath) {
          toPath = currPath
        }
      }

      // Jump to the current page and report an error
      path !== toPath && go(toPath, true)
    },

    async closeTag(tag: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route
        if (affix) return

        const index = this.visitedTags.findIndex(tag => tag.fullPath === fullPath)
        index !== -1 && this.visitedTags.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)
      if (path !== tag.path) {
        // Closed is not the activation tag
        close(tag)
        return
      }

      // Closed is activated tag
      let toTarget: RouteLocationRaw = {}
      const index = this.visitedTags.findIndex(tag => tag.path === path)

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.visitedTags.length === 1) {
          toTarget = '/home'
        } else {
          // Jump to the right tab
          const page = this.visitedTags[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // Close the current tab
        const page = this.visitedTags[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute.value)
      await replace(toTarget)
    },

    // Close according to key
    async closeTagByKey(key: string, router: Router) {
      const index = this.visitedTags.findIndex(item => (item.fullPath || item.path) === key)
      if (index !== -1) {
        await this.closeTag(this.visitedTags[index], router)
        const { currentRoute, replace } = router
        // Check whether the current route exists in the visitedTags
        const isActivated = this.visitedTags.findIndex(item => {
          return item.fullPath === currentRoute.value.fullPath
        })
        // If the current route does not exist in the visitedTags, try to switch to another route
        if (isActivated === -1) {
          let pageIndex: number
          if (index > 0) {
            pageIndex = index - 1
          } else if (index < this.visitedTags.length - 1) {
            pageIndex = index + 1
          } else {
            pageIndex = -1
          }
          if (pageIndex >= 0) {
            const page = this.visitedTags[index - 1]
            const toTarget = getToTarget(page)
            await replace(toTarget)
          }
        }
      }
    },

    // Close the tags on the right and jump
    async closeLeftTags(route: RouteLocationNormalized, router: Router) {
      const index = this.visitedTags.findIndex(item => item.path === route.path)

      if (index > 0) {
        const leftTags = this.visitedTags.slice(0, index)
        const pathList: string[] = []
        for (const item of leftTags) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkClosedTags(pathList)
      }
      this.updateCachedTags()
      handleGotoPage(router)
    },

    // Close the tags on the left and jump
    async closeRightTags(route: RouteLocationNormalized, router: Router) {
      const index = this.visitedTags.findIndex(item => item.fullPath === route.fullPath)

      if (index >= 0 && index < this.visitedTags.length - 1) {
        const rightTags = this.visitedTags.slice(index + 1, this.visitedTags.length)

        const pathList: string[] = []
        for (const item of rightTags) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkClosedTags(pathList)
      }
      this.updateCachedTags()
      handleGotoPage(router)
    },

    // Close other tabs
    async closeOtherTags(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.visitedTags.map(item => item.fullPath)

      const pathList: string[] = []

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.visitedTags.find(item => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          if (!affix) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkClosedTags(pathList)
      this.updateCachedTags()
      handleGotoPage(router)
    },

    // Close tags in bulk
    bulkClosedTags(pathList: string[]) {
      this.visitedTags = this.visitedTags.filter(item => !pathList.includes(item.fullPath))
    },

    // Close all tags
    async closeAllTags(router: Router) {
      this.visitedTags = this.visitedTags.filter(tag => tag?.meta?.affix ?? false)
      this.cleanCachedTags()
      this.gotToPage(router)
    },

    // Replace tags path
    async updateTagPath(fullPath: string, route: RouteLocationNormalized) {
      const findTag = this.getVisitedTags.find(item => item === route)
      if (findTag) {
        findTag.fullPath = fullPath
        findTag.path = fullPath
        this.updateCachedTags()
      }
    },

    // Refresh tag pages
    async refreshTagPage(router: Router) {
      const { currentRoute } = router
      const route = unref(currentRoute)

      const findTag = this.getCachedTags.find(item => item === route.name)
      if (findTag) {
        this.cachedTags.delete(findTag)
      }
      const reload = useReload(router)
      await reload()
    },

    cleanCachedTags() {
      this.cachedTags = new Set()
    },

    resetState() {
      this.visitedTags = []
      this.cleanCachedTags()
    }
  }
})

// Need to be used outside the setup
export function useTagStoreWithOut() {
  return useTagStore(stores)
}
