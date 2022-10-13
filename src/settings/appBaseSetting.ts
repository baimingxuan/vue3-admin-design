import type { AppConfig } from '@/interfaces/config'
import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { ThemeEnum, PageTransitionEnum, PermissionModeEnum } from '@/enums/appEnum'

export const appSetting: AppConfig = {
  // Theme color
  themeColor: '#1890ff',
  headerSetting: {
    // Show breadCrumb
    showBreadCrumb: true,
    // Show page tags
    showPageTags: true,
    // Show search
    showSearch: true,
    // Turn on full screen
    showFullScreen: true,
    // Show locale
    showLocale: true,
    // Show document button
    showDoc: true,
    // Show github button
    showGithub: true
  },
  // Menu configuration
  menuSetting: {
    // Menu type
    menuType: MenuTypeEnum.SIDER_MENU,
    // Menu mode
    menuMode: MenuModeEnum.INLINE,
    // Menu theme
    menuTheme: ThemeEnum.DARK,
    // Menu split
    menuSplit: false,
    // Menu can drag
    menuCanDrag: false,
     // Menu collapse
    menuFold: false,
    // Menu collapse type
    menuFoldBtn: MenuFoldBtnEnum.HEADER,
    // Whether to display the menu name when folding the menu
    menuFoldShowTitle: false,
    // Menu width
    menuWidth: 210,
    // Hydrid sider menu fixed
    menuFixed: false,
    // Hybrid mode sider menu hidden
    menuHidden: false
  },
  // Transition settings
  transitionSetting: {
    // Whether to open the top progress bar
    openNProgress: false,
    // Whether to open the page switching animation
    openTransition: true,
    // Page basic switching animation
    basicTransition: PageTransitionEnum.FADE
  },
  // Permission mode
  permissionMode: PermissionModeEnum.MAPPING,
  // Page tags can cached
  pageTagsCached: false,
  // Route keepAlive
  openKeepAlive: true,
  // Lock screen time
  lockScreenTime: 0,
  // Whether to show the global footer
  showFooter: false,
  // Whether to turn on the color weak mode
  colorWeak: false
}