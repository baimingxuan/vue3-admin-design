import { MenuModeEnum, MenuTypeEnum, MenuFoldEnum } from '../enums/menuEnum'
import { ThemeEnum } from '../enums/appEnum'
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
  menuType: MenuTypeEnum
  menuMode: MenuModeEnum
  menuTheme: ThemeEnum
  menuFold: MenuFoldEnum
  collapsed: boolean
  collapsedShowTitle: boolean
  menuWidth: number
}

export interface LocaleSetting {
  // show locale picker
  showLocalePicker: boolean
  // current locale
  currentLocale: LocaleType
}