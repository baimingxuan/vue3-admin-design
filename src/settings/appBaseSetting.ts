import type { AppConfig } from '@/interfaces/config'
import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { ThemeEnum, PageTransitionEnum } from '@/enums/appEnum'

export const appSetting: AppConfig = {
  // theme color
  themeColor: '#1890ff',
  headerSetting: {
    // show breadCrumb
    showBreadCrumb: true,
    // show page tags
    showPageTags: true,
    // show locale
    showLocale: true,
    // turn on full screen
    showFullScreen: false,
    // show document button
    showDoc: false,
    // show github button
    showGithub: true
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
    menuFoldBtn: MenuFoldBtnEnum.NONE,
    // whether to display the menu name when folding the menu
    menuFoldShowTitle: false,
    // menu width
    menuWidth: 210
  },
  // transition settings
  transitionSetting: {
    // whether to open the top progress bar
    openNProgress: false,
    // whether to open the page switching animation
    openTransition: true,
    // page basic switching animation
    basicTransition: PageTransitionEnum.FADE
  },
  // Lock screen time
  lockScreenTime: 0,
  // whether to show the global footer
  showFooter: false,
  // Whether to turn on the color weak mode
  colorWeak: false
}