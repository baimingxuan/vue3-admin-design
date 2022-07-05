import type { AppConfig } from '@/interfaces/config'
import { MenuTypeEnum, MenuModeEnum, MenuFoldEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'

const appSetting: AppConfig = {
  themeColor: '#fff',
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
    // Menu type
    menuType: MenuTypeEnum.SIDE_MENU,
    menuMode: MenuModeEnum.VERTICAL,
    menuTheme: ThemeEnum.DARK,
    menuFold: MenuFoldEnum.NONE,
    collapsed: false,
    collapsedShowTitle: false,
    menuWidth: 210
  },
  // whether to show the global footer
  showFooter: false
}