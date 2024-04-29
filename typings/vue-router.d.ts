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
    // Whether not to cached route
    ignoreKeepAlive?: boolean
    // Never show in menu
    hideMenu?: boolean
    // Hide submenu
    hideChildrenInMenu?: boolean
    // Whether is a iframe
    iframeSrc?: string
    // Whether is a link
    isLink?: boolean
    // current page transition
    transitionName?: string
  }
}
