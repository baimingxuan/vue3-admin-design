import { MenuModeEnum, MenuTypeEnum, MenuFoldBtnEnum } from '../enums/menuEnum'
import { PageTransitionEnum, ThemeEnum } from '../enums/appEnum'
import { PermissionModeEnum } from '../enums/appEnum'

export interface AppConfig {
  // Theme color
  themeColor: string
  // Header setting
  headerSetting: HeaderSetting
  // Menu setting
  menuSetting: MenuSetting
  // Transition setting
  transitionSetting: TransitionSetting
  // Permission mode
  permissionMode: PermissionModeEnum
  // Whether tags cached
  tagsCached: boolean
  // Route keepAlive
  openKeepAlive: boolean
  // Lock screen time
  lockScreenTime: number
  // Whether to show the global footer
  showFooter: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
}

export interface HeaderSetting {
  // Show breadCrumb
  showBreadCrumb: boolean
  // Show tags
  showTags: boolean
  // Show search
  showSearch: boolean
  // Turn on full screen
  showFullScreen: boolean
  // Show locale
  showLocale: boolean
  // Show document button
  showDoc: boolean
  // Show github button
  showGithub: boolean
}

export interface MenuSetting {
  // Menu type
  menuType: MenuTypeEnum
  // Menu mode
  menuMode: MenuModeEnum
  // Menu theme
  menuTheme: ThemeEnum
  // Menu split
  menuSplit: boolean
  // Menu can drag
  menuCanDrag: boolean
  // Menu collapse
  menuFold: boolean
  // Menu collapse type
  menuFoldBtn: MenuFoldBtnEnum
  // Whether to display the menu name when folding the menu
  menuFoldShowTitle: boolean
  // Menu width
  menuWidth: number,
  // Hydrid mode sider menu fixed
  menuFixed: boolean,
  // Hybrid mode sider menu hidden
  menuHidden: boolean
}

export interface TransitionSetting {
  // Whether to open the top progress bar
  openNProgress: boolean
  // Whether to open the page switching animation
  openTransition: boolean
  // Page basic switching animation
  basicTransition: PageTransitionEnum
}