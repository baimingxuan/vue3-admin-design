import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useHeaderSetting() {
    const appStore = useAppStore()

    const getShowBreadCrumb = computed(() => appStore.getHeaderSetting.showBreadCrumb)

    const getShowPageTags = computed(() => appStore.getHeaderSetting.showPageTags)

    const getShowLocale = computed(() => appStore.getHeaderSetting.showLocale)

    const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)

    const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc)

    const getShowGithub = computed(() => appStore.getHeaderSetting.showGithub)

    return {
        getShowBreadCrumb,
        getShowPageTags,
        getShowLocale,
        getShowFullScreen,
        getShowDoc,
        getShowGithub
    }
}