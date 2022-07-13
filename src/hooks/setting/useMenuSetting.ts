import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuType = computed(() => appStore.getMenuSetting.menuType)

  const getMenuMode = computed(() => appStore.getMenuSetting.menuMode)

  const getThemeColor = computed(() => appStore.getAppConfig.themeColor)

  const getMenuTheme = computed(() => appStore.getMenuSetting.menuTheme)

  const getMenuSplit = computed(() => appStore.getMenuSetting.menuSplit)

  const getMenuFold = computed(() => appStore.getMenuSetting.menuFold)

  const getMenuFoldBtn = computed(() => appStore.getMenuSetting.menuFoldBtn)

  const getMenuFoldShowTitle = computed(() => appStore.getMenuSetting.menuFoldShowTitle)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  return {
    getMenuType,
    getMenuMode,
    getThemeColor,
    getMenuTheme,
    getMenuSplit,
    getMenuFold,
    getMenuFoldBtn,
    getMenuFoldShowTitle,
    getMenuWidth
  }
}