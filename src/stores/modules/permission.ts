import { defineStore } from 'pinia'
import { stores } from '../index'

import type { AppRoute, AppMenu } from '@/router/types'

// import { filter } from '@/utils/helper/treeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { asyncRoutes } from '@/router/routes'
// import { useAppStoreWithOut } from './app'

interface PermissionState {
  menuList: AppMenu[]
}

export const usePermissionStore = defineStore('permission', {
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
      // const appStore = useAppStoreWithOut()

      let routes: AppRoute[] = []
      // routes = filter(asyncRoutes)
      
      const menuList = transformRouteToMenu(asyncRoutes)
      // menuList.sort((a, b) => {
      //   return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
      // })

      console.log('menuList', menuList)
      this.setMenuList(menuList)
      return routes
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(stores)
}

