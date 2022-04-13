import { MenuModeEnum, MenuTypeEnum, MenuFoldEnum } from '../enums/menuEnum'
import { ThemeEnum } from '../enums/appEnum'

export interface appConfig {
  // theme color
  themeColor: string
  // menu setting
  menuSetting: MenuSetting
}

export interface MenuSetting {
  type: MenuTypeEnum
  mode: MenuModeEnum
  theme: ThemeEnum
  menuFold: MenuFoldEnum
  collapsed: boolean
  collapsedShowTitle: boolean
  menuWidth: number
}