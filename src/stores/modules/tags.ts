import { defineStore } from 'pinia'
import { unref, toRaw } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { getRawRoute } from '@/utils'
import { useGo } from '@/hooks/web/usePage'

interface TagsState {
  visitedTags: RouteLocationNormalized[]
  cachedTags: Set<string>
}

export const useTagsStore = defineStore({
  id: 'app-tags',
  state: (): TagsState => ({
    visitedTags: [],
    cachedTags: new Set()
  }),
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
    },
    
    // Update the cached tags according to the currently opened tags
    async updateCachedTags() {
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

    async closeAllTags(router: Router) {
      this.visitedTags = this.visitedTags.filter(tag => tag?.meta?.affix ?? false)
      this.cleanCachedTags()
      this.gotToPage(router)
    },

    cleanCachedTags() {
      this.cachedTags = new Set()
    },

    resetState() {
      this.visitedTags = []
      this.cleanCachedTags()
    },
  }
})
