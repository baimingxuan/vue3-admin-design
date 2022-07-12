import { MenuTypeEnum, MenuModeEnum } from '@/enums/menuEnum'

export interface ColorItem {
  name: string
  color: string
}

// menu type list
export const menuTypeList = [
  {
    title: '左侧菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDE_MENU
  },
  {
    title: '顶部菜单',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU
  },
  {
    title: '混合菜单',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_MENU
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
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  // menu
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,
  // header
  HEADER_FIXED,
  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,
  // page
  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION
}

