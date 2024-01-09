import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useTransitionSetting() {
  const appStore = useAppStore()

  const getOpenNProgress = computed(() => appStore.getTransitionSetting.openNProgress)

  const getOpenPageLoading = computed(() => appStore.getTransitionSetting.openPageLoading)

  const getOpenTransition = computed(() => appStore.getTransitionSetting.openTransition)

  const getBasicTransition = computed(() => appStore.getTransitionSetting.basicTransition)

  return {
    getOpenNProgress,
    getOpenPageLoading,
    getOpenTransition,
    getBasicTransition
  }
}
