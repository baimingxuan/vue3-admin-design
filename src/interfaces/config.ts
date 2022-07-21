import { MenuModeEnum, MenuTypeEnum, MenuFoldBtnEnum } from '../enums/menuEnum'
import { PageTransitionEnum, ThemeEnum } from '../enums/appEnum'

export interface AppConfig {
  // theme color
  themeColor: string
  // header setting
  headerSetting: HeaderSetting
  // menu setting
  menuSetting: MenuSetting
  // transition setting
  transitionSetting: TransitionSetting
  // route keepAlive
  openKeepAlive: boolean
  // lock screen time
  lockScreenTime: number
  // whether to show the global footer
  showFooter: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
}

export interface HeaderSetting {
  // show breadCrumb
  showBreadCrumb: boolean
  // show page tags
  showPageTags: boolean
  // show locale
  showLocale: boolean
  // turn on full screen
  showFullScreen: boolean
  // show document button
  showDoc: boolean
  // show github button
  showGithub: boolean
}

export interface MenuSetting {
  // menu type
  menuType: MenuTypeEnum
  // menu mode
  menuMode: MenuModeEnum
  // menu theme
  menuTheme: ThemeEnum
  // menu split
  menuSplit: boolean
  // menu collapse
  menuFold: boolean
   // menu collapse type
  menuFoldBtn: MenuFoldBtnEnum
  // whether to display the menu name when folding the menu
  menuFoldShowTitle: boolean
  // menu width
  menuWidth: number
}

export interface TransitionSetting {
  // whether to open the top progress bar
  openNProgress: boolean
  // whether to open the page switching animation
  openTransition: boolean
  // page basic switching animation
  basicTransition: PageTransitionEnum
}