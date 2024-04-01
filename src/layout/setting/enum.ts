import type { ComposerTranslation } from 'vue-i18n'
import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { PageTransitionEnum } from '@/enums/appEnum'

export interface ColorItem {
  name: string
  color: string
}

// Menu type list
export const menuTypeList = (t: ComposerTranslation) => [
  {
    title: t('layout.menu.siderMenu'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDER_MENU
  },
  {
    title: t('layout.menu.headerMenu'),
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.HEADER_MENU
  },
  {
    title: t('layout.menu.hybridMenu'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.HYBRID_MENU
  }
]

// App theme color
export const appThemeColorList = (t: ComposerTranslation): ColorItem[] => [
  {
    name: t('layout.theme.daybreakBlue'),
    color: '#1890ff'
  },
  {
    name: t('layout.theme.dustRed'),
    color: '#f5222d'
  },
  {
    name: t('layout.theme.volcano'),
    color: '#fa541c'
  },
  {
    name: t('layout.theme.sunsetOrange'),
    color: '#faad14'
  },
  {
    name: t('layout.theme.cyan'),
    color: '#13c2c2'
  },
  {
    name: t('layout.theme.polarGreen'),
    color: '#52c41a'
  },
  {
    name: t('layout.theme.geekBlue'),
    color: '#2f54eb'
  },
  {
    name: t('layout.theme.goldenPurple'),
    color: '#722ed1'
  }
]

export enum HandlerEnum {
  // Layout type
  CHANGE_LAYOUT,
  // Theme color
  CHANGE_THEME_COLOR,
  // Interface function
  MENU_SPLIT,
  MENU_CAN_DRAG,
  MENU_FIXED,
  MENU_FOLD,
  MENU_FOLD_BTN,
  MENU_FOLD_SHOW_TITLE,
  PAGE_TAGS_CACHED,
  MENU_WIDTH,
  LOCK_SCREEN_TIME,
  // Interface display
  SHOW_BREADCRUMB,
  SHOW_PAGE_TAGS,
  SHOW_SEARCH,
  SHOW_FULL_SCREEN,
  SHOW_LOCALE,
  SHOW_DOC,
  SHOW_GITHUB,
  SHOW_FOOTER,
  COLOR_WEAK,
  GRAY_MODE,

  // Animation settings
  OPEN_NPROGRESS,
  OPEN_TRANSITION,
  BASIC_TRANSITION
}

// Menu Fold Button options
export const menuFoldBtnOptions = (t: ComposerTranslation) => [
  {
    value: MenuFoldBtnEnum.NONE,
    label: t('layout.menu.collapseBtnPosition.hidden')
  },
  {
    value: MenuFoldBtnEnum.HEADER,
    label: t('layout.menu.collapseBtnPosition.header')
  },
  {
    value: MenuFoldBtnEnum.SIDER,
    label: t('layout.menu.collapseBtnPosition.sider')
  }
]

// Page transition options
export const pageTransitionOptions = [
  PageTransitionEnum.FADE,
  PageTransitionEnum.FADE_SLIDE,
  PageTransitionEnum.FADE_SCALE,
  PageTransitionEnum.FADE_BOTTOM,
  PageTransitionEnum.ZOOM_FADE,
  PageTransitionEnum.ZOOM_OUT
].map(item => {
  return {
    label: item,
    value: item
  }
})
