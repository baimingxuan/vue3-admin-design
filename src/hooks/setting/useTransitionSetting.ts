import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useTransitionSetting() {
    const appStore = useAppStore()

    const getOpenNProgress = computed(() => appStore.getTransitionSetting.openNProgress)

    return {
      getOpenNProgress
    }
}