export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // Route title (must set!!)
    title: string
    // Icon, which is also a menu icon
    icon?: string
    // Affix tag or not
    affix?: boolean
    // Menu sort, only for the first level
    orderNo?: number
    // Currently active menu
    currentActiveMenu?: string
    // Whether not to cached route
    ignoreKeepAlive?: boolean
    // Never show in menu
    hideMenu?: boolean
    // Hide submenu
    hideChildrenInMenu?: boolean
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean
  }
}