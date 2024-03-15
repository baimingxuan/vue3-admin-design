import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import type { AppModeEnum } from '@/enums/appEnum'

export function useBaseSetting() {
  const appStore = useAppStore()

  const getAppMode = computed(() => appStore.getAppMode)

  const getThemeColor = computed(() => appStore.getAppConfig.themeColor)

  const getTagsCached = computed(() => appStore.getAppConfig.tagsCached)

  const getLockScreenTime = computed(() => appStore.getAppConfig.lockScreenTime)

  const getShowFooter = computed(() => appStore.getAppConfig.showFooter)

  const getColorWeak = computed(() => appStore.getAppConfig.colorWeak)

  const getGrayMode = computed(() => appStore.getAppConfig.grayMode)

  function setAppMode(mode: AppModeEnum) {
    appStore.setAppMode(mode)
  }

  return {
    setAppMode,
    getAppMode,
    getThemeColor,
    getTagsCached,
    getLockScreenTime,
    getShowFooter,
    getColorWeak,
    getGrayMode
  }
}
