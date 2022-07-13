import { MenuModeEnum, MenuTypeEnum, MenuFoldBtnEnum } from '../enums/menuEnum'
import { PageTransitionEnum, ThemeEnum } from '../enums/appEnum'
import { LocaleType } from '@/types'

export interface AppConfig {
  // theme color
  themeColor: string
  // header setting
  headerSetting: HeaderSetting
  // menu setting
  menuSetting: MenuSetting
  // whether to show the global footer
  showFooter: boolean
}

export interface HeaderSetting {
  // show breadCrumb
  showBreadCrumb: boolean
  // show page tags
  showPageTags: boolean
  // turn on full screen
  showFullScreen: boolean
  // show document button
  showDoc: boolean
  // show github button
  showGithub: boolean
  // locale setting
  localeSetting: LocaleSetting
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

export interface LocaleSetting {
  // show locale picker
  showLocalePicker: boolean
  // current locale
  currentLocale: LocaleType
}

export interface TransitionSetting {
  // whether to open the top progress bar
  openNProgress: boolean
  // whether to open page switching loading
  openPageLoading: boolean
  // page basic switching animation
  basicTransition: PageTransitionEnum
}