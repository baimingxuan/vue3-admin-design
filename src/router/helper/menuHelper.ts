import type { AppMenu, AppRoute } from '../types'
import { isUrl } from '@/utils/is'
import { cloneDeep } from 'lodash-es'
import { findPath, treeMap } from '@/utils/helper/treeHelper'

export function getAllParentPath<T = Recordable>(menus: T[], path: string) {
  const currMenuList = findPath(menus, n => n.path === path) as AppMenu[]

  return (currMenuList || []).map(item => item.path)
}

function joinParentPath(menus: AppMenu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // Path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

export function transformRouteToMenu(routes: AppRoute[]): AppMenu[] {
  const cloneRoutes = cloneDeep(routes)
  const routeList: AppRoute[] = []

  cloneRoutes.forEach(item => {
    if (item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }

    routeList.push(item)
  })

  const list = treeMap(routeList, {
    conversion: (node: AppRoute) => {
      const { meta: { title, hideMenu = false, ...rest } = {} } = node

      return {
        ...(rest || {}),
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })

  joinParentPath(list)
  return cloneDeep(list)
}
