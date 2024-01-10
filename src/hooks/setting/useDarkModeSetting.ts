import { computed, unref } from 'vue'
import { theme } from 'ant-design-vue/lib'
import { ThemeEnum } from '@/enums/appEnum'
import { useBaseSetting } from './useBaseSetting'

export function useDarkModeSetting() {
  const { getAppMode } = useBaseSetting()
  const { defaultAlgorithm, darkAlgorithm } = theme

  const isDarkMode = computed(() => unref(getAppMode) === ThemeEnum.DARK)

  const getModeAlgorithm = computed(() => {
    return unref(isDarkMode) ? darkAlgorithm : defaultAlgorithm
  })

  return { getModeAlgorithm, isDarkMode, getAppMode }
}
