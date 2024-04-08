import { computed, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum'
import type { MenuSetting } from '@/types/config'
import type { ThemeEnum } from '@/enums/appEnum'
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

  const getMenuFixed = computed(() => appStore.getMenuSetting.menuFixed)

  const getReallWidth = computed(() => {
    if (unref(getIsHybridMenu)) {
      return unref(getMenuFold) && !unref(getMenuFixed) ? unref(getSideBarMinWidth) : unref(getMenuWidth)
    }
    return unref(getMenuFold) ? unref(getSideBarMinWidth) : unref(getMenuWidth)
  })

  const getIsHeaderMenu = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.HEADER_MENU
  })

  const getIsHybridMenu = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.HYBRID_MENU
  })

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  const getIsSideMenu = computed(() => unref(getMenuType) === MenuTypeEnum.SIDER_MENU)

  const getSideBarMinWidth = computed(() => {
    const { menuFoldShowTitle } = appStore.getMenuSetting
    return menuFoldShowTitle ? SIDE_BAR_SHOW_TITLE_MIN_WIDTH : SIDE_BAR_MIN_WIDTH
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setAppConfig({ menuSetting })
  }

  // Toggled menu fold
  function toggledMenuFold() {
    setMenuSetting({
      menuFold: !unref(getMenuFold)
    })
  }

  // Change menu theme
  function changeMenuTheme(menuTheme: ThemeEnum) {
    setMenuSetting({
      menuTheme
    })
  }

  return {
    setMenuSetting,
    toggledMenuFold,
    changeMenuTheme,
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
    getMenuFixed,
    getReallWidth,
    getIsHeaderMenu,
    getIsHybridMenu,
    getIsHorizontal,
    getIsSideMenu,
    getSideBarMinWidth
  }
}
