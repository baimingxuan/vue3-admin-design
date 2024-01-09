import type { AppMenu } from '../types'

import { PermissionModeEnum } from '@/enums/appEnum'
import { asyncRoutes } from '@/router/routes'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import { getAllParentPath, transformRouteToMenu } from '@/router/helper/menuHelper'

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getAppConfig.permissionMode
}

const isMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.MAPPING
}

// const isBackendMode = () => {
//   return PermissionModeEnum.BACKEND
// }

// Get async menus
export async function getAsyncMenus(): Promise<AppMenu[]> {
  const staticMenus = transformRouteToMenu(asyncRoutes)
  staticMenus.sort((a, b) => {
    return (a?.orderNo || staticMenus.length) - (b?.orderNo || staticMenus.length)
  })

  const permissionStore = usePermissionStore()
  if (isMappingMode()) {
    return permissionStore.getMenuList.filter(item => !item.hideMenu)
  }

  return staticMenus.filter(item => !item.hideMenu)
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<AppMenu[]> {
  const menus = await getAsyncMenus()

  const shallowMenuList = menus.map(item => ({ ...item, children: undefined }))

  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string): Promise<AppMenu[]> {
  const menus = await getAsyncMenus()

  const parent = menus.find(item => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.hideChildrenInMenu) {
    return [] as AppMenu[]
  }

  return parent.children
}

// Get the parent menu path of the currently active menu
export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()

  const allParentPath = getAllParentPath(menus, currentPath)

  return allParentPath?.[0]
}
