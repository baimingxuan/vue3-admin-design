import { computed, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { MenuTypeEnum } from '@/enums/menuEnum'
import { SIDE_BAR_MIN_WIDTH, SIDE_BAR_SHOW_TITLE_MIN_WIDTH } from '@/enums/appEnum'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuType = computed(() => appStore.getMenuSetting.menuType)

  const getMenuMode = computed(() => appStore.getMenuSetting.menuMode)

  const getThemeColor = computed(() => appStore.getAppConfig.themeColor)

  const getMenuTheme = computed(() => appStore.getMenuSetting.menuTheme)

  const getMenuSplit = computed(() => appStore.getMenuSetting.menuSplit)

  const getMenuCanDrag = computed(() => appStore.getMenuSetting.menuCanDrag)

  const getMenuFold = computed(() => appStore.getMenuSetting.menuFold)

  const getMenuFoldBtn = computed(() => appStore.getMenuSetting.menuFoldBtn)

  const getMenuFoldShowTitle = computed(() => appStore.getMenuSetting.menuFoldShowTitle)

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getIsMixMenu = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_MENU
  })

  const getSideBarMinWidth = computed(() => {
    const { menuFoldShowTitle } = appStore.getMenuSetting
    return menuFoldShowTitle ? SIDE_BAR_SHOW_TITLE_MIN_WIDTH : SIDE_BAR_MIN_WIDTH
  })

  return {
    getMenuType,
    getMenuMode,
    getThemeColor,
    getMenuTheme,
    getMenuSplit,
    getMenuCanDrag,
    getMenuFold,
    getMenuFoldBtn,
    getMenuFoldShowTitle,
    getMenuWidth,
    getIsMixMenu,
    getSideBarMinWidth
  }
}