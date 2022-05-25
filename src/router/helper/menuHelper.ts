import type { AppMenu, AppMenuModule } from '../types'
import { isUrl } from '@/utils/is'

function joinParentPath(menus: AppMenu[], parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index]
        // https://next.router.vuejs.org/guide/essentials/nested-routes.html
        // Note that nested paths that start with / will be treated as a root path.
        // This allows you to leverage the component nesting without having to use a nested URL.
        if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
          // path doesn't start with /, nor is it a url, join parent path
          menu.path = `${parentPath}/${menu.path}`
        }
        if (menu?.children?.length) {
          joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
        }
    }
}

// Parsing the menu module
export function transformMenuModule(menuModule: AppMenuModule): AppMenu {
    const { menu } = menuModule
  
    const menuList = [menu]
  
    joinParentPath(menuList)
    return menuList[0]
}