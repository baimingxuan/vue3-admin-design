import type { RouteLocationNormalized, Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { useTagStore } from '@/stores/modules/tags'
import { useAppStore } from '@/stores/modules/app'

enum TagActionEnum {
  REFRESH,
  CLOSE,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL
}

export function useTags(_router?: Router) {
  const tagStore = useTagStore()
  const router = _router || useRouter()
  const { currentRoute } = router

  function canUseTags(): boolean {
    const appStore = useAppStore()
    const { showTags } = appStore.getHeaderSetting

    if (!showTags) {
      throw new Error('The multi-tab page is currently not open, please open it in the settings！')
    }
    return showTags
  }

  function getCurrentTag() {
    const route = unref(currentRoute)
    return tagStore.getVisitedTags.find(item => item.fullPath === route.fullPath)!
  }

  async function handleTagAction(action: TagActionEnum, tag?: RouteLocationNormalized) {
    const canUse = canUseTags()
    if (!canUse) return

    const currentTag = getCurrentTag()
    switch (action) {
      case TagActionEnum.REFRESH:
        await tagStore.refreshTagPage(router)
        break

      case TagActionEnum.CLOSE:
        await tagStore.closeTag(tag || currentTag, router)
        break

      case TagActionEnum.CLOSE_LEFT:
        await tagStore.closeLeftTags(currentTag, router)
        break

      case TagActionEnum.CLOSE_RIGHT:
        await tagStore.closeRightTags(currentTag, router)
        break

      case TagActionEnum.CLOSE_OTHER:
        await tagStore.closeOtherTags(currentTag, router)
        break

      case TagActionEnum.CLOSE_ALL:
        await tagStore.closeAllTags(router)
        break
    }
  }

  return {
    refresh: () => handleTagAction(TagActionEnum.REFRESH),
    close: (tag?: RouteLocationNormalized) => handleTagAction(TagActionEnum.CLOSE, tag),
    closeLeft: () => handleTagAction(TagActionEnum.CLOSE_LEFT),
    closeRight: () => handleTagAction(TagActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTagAction(TagActionEnum.CLOSE_OTHER),
    closeAll: () => handleTagAction(TagActionEnum.CLOSE_ALL)
  }
}
