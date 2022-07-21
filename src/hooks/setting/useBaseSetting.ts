import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { AppModeEnum } from '@/enums/appEnum'

export function useBaseSetting() {
    const appStore = useAppStore()

    const getAppMode = computed(() => appStore.getAppMode)

    const getThemeColor = computed(() => appStore.getAppConfig.themeColor)

    const getOpenKeepAlive = computed(() => appStore.getAppConfig.openKeepAlive)

    const getLockScreenTime = computed(() => appStore.getAppConfig.lockScreenTime)

    const getShowFooter = computed(() => appStore.getAppConfig.showFooter)

    const getColorWeak = computed(() => appStore.getAppConfig.colorWeak)

    function setAppMode(mode: AppModeEnum) {
        appStore.setAppMode(mode)
    }

    return {
        setAppMode,
        getAppMode,
        getThemeColor,
        getOpenKeepAlive,
        getLockScreenTime,
        getShowFooter,
        getColorWeak
    }
}