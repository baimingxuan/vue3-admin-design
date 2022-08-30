import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { PageTransitionEnum } from '@/enums/appEnum'

export interface ColorItem {
  name: string
  color: string
}

// menu type list
export const menuTypeList = [
  {
    title: '左侧菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDER_MENU
  },
  {
    title: '顶部菜单',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.HEADER_MENU
  },
  {
    title: '混合菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.HYBRID_MENU
  }
]

// app theme color
export const appThemeColorList: ColorItem[] = [
  {
      name: '拂晓蓝',
      color: '#1890ff'
  },
  {
      name: '薄暮',
      color: '#f5222d'
  },
  {
      name: '火山',
      color: '#fa541c'
  },
  {
      name: '日暮',
      color: '#faad14'
  },
  {
      name: '明青',
      color: '#13c2c2'
  },
  {
      name: '极光绿',
      color: '#52c41a'
  },
  {
      name: '极客蓝',
      color: '#2f54eb'
  },
  {
      name: '酱紫',
      color: '#722ed1'
  }
]

export enum HandlerEnum {
  // layout type
  CHANGE_LAYOUT,
  // theme color
  CHANGE_THEME_COLOR,
  // interface function
  MENU_SPLIT,
  MENU_CAN_DRAG,
  MENU_FIXED,
  MENU_FOLD,
  MENU_FOLD_BTN,
  MENU_FOLD_SHOW_TITLE,
  MENU_WIDTH,
  LOCK_SCREEN_TIME,
  // interface display
  SHOW_BREADCRUMB,
  SHOW_PAGE_TAGS,
  SHOW_LOCALE,
  SHOW_FULL_SCREEN,
  SHOW_DOC,
  SHOW_GITHUB,
  SHOW_FOOTER,
  COLOR_WEAK,
  
  // animation settings
  OPEN_NPROGRESS,
  OPEN_TRANSITION,
  BASIC_TRANSITION
}

// menuFoldBtn options
export const menuFoldBtnOptions = [
  {
    value: MenuFoldBtnEnum.NONE,
    label: '隐藏'
  },
  {
    value: MenuFoldBtnEnum.HEADER,
    label: '顶部'
  },
  {
    value: MenuFoldBtnEnum.FOOTER,
    label: '底部'
  }
]

// page transition options
export const pageTransitionOptions = [
  PageTransitionEnum.FADE,
  PageTransitionEnum.FADE_SIDE,
  PageTransitionEnum.FADE_BOTTOM,
  PageTransitionEnum.FADE_SCALE,
  PageTransitionEnum.ZOOM_FADE,
  PageTransitionEnum.ZOOM_OUT
].map(item => {
  return {
    label: item,
    value: item,
  }
})
