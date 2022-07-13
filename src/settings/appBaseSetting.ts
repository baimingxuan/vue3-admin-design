import type { AppConfig } from '@/interfaces/config'
import { MenuTypeEnum, MenuModeEnum, MenuFoldEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'

export const appSetting: AppConfig = {
  // theme color
  themeColor: '#1890ff',
  headerSetting: {
    // show breadCrumb
  showBreadCrumb: true,
  // show page tags
  showPageTags: true,
  // turn on full screen
  showFullScreen: true,
  // show document button
  showDoc: true,
  // show github button
  showGithub: true,
  // locale setting
  localeSetting: {
      // show locale picker
      showLocalePicker: true,
      // current locale
      currentLocale: 'zh_CN'
    }
  },
  // Menu configuration
  menuSetting: {
    // menu type
    menuType: MenuTypeEnum.SIDE_MENU,
    // menu mode
    menuMode: MenuModeEnum.VERTICAL,
    // menu theme
    menuTheme: ThemeEnum.DARK,
    // menu split
    menuSplit: false,
     // menu collapse
    menuFold: false,
    // menu collapse type
    menuFoldBtn: MenuFoldEnum.NONE,
    // whether to display the menu name when folding the menu
    menuFoldShowTitle: false,
    // menu width
    menuWidth: 210
  },
  // whether to show the global footer
  showFooter: false
}