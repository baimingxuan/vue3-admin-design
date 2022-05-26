import { defineStore, createPinia } from 'pinia'

import type { AppRoute, AppMenu } from '@/router/types'

import { filter } from '@/utils/helper/treeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { asyncRoutes } from '@/router/routes'

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
      let routes: AppRoute[] = []
      routes = filter(asyncRoutes)
      
      const menuList = transformRouteToMenu(routes)
      // menuList.sort((a, b) => {
      //   return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
      // })

      this.setMenuList(menuList)
      return routes
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(createPinia())
}

