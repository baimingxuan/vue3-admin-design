import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getShowBreadCrumb = computed(() => appStore.getHeaderSetting.showBreadCrumb)

  const getShowTags = computed(() => appStore.getHeaderSetting.showTags)

  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)

  const getShowLocale = computed(() => appStore.getHeaderSetting.showLocale)

  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)

  const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc)

  const getShowGithub = computed(() => appStore.getHeaderSetting.showGithub)

  return {
    getShowBreadCrumb,
    getShowTags,
    getShowSearch,
    getShowFullScreen,
    getShowLocale,
    getShowDoc,
    getShowGithub
  }
}
