import { defineStore } from 'pinia'
import { stores } from '../index'

import type { AppRoute, AppMenu } from '@/router/types'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { asyncRoutes } from '@/router/routes'
import { useAppStoreWithOut } from './app'
import { appSetting } from '@/settings/appBaseSetting'
import { PermissionModeEnum } from '@/enums/appEnum'

interface PermissionState {
  menuList: AppMenu[]
}

export const usePermissionStore = defineStore('app-permission', {
  state: (): PermissionState => ({
    menuList: []
  }),
  getters: {
    getMenuList(): AppMenu[] {
      return this.menuList
    }
  },
  actions: {
    setMenuList(list: AppMenu[]) {
      this.menuList = list
    },
    async buildRoutesAction(): Promise<AppRoute[]> {
      const appStore = useAppStoreWithOut()

      let routes: AppRoute[] = []
      const { permissionMode = appSetting.permissionMode } = appStore.getAppConfig

      if (permissionMode === PermissionModeEnum.MAPPING) {
        routes = asyncRoutes
        const menuList = transformRouteToMenu(routes)

        menuList.sort((a, b) => {
          return (a?.orderNo || menuList.length) - (b?.orderNo || menuList.length)
        })

        this.setMenuList(menuList)
      }

      return routes
    },
    resetState(): void {
      this.menuList = []
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(stores)
}
