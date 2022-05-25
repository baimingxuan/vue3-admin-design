import { defineStore } from 'pinia'

import type { AppRoute, AppMenu } from '@/router/types'

import { filter } from '@/utils/helper/treeHelper'
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
      routes = filter(asyncRoutes, () => true)
      return Promise.resolve(routes)
    }
  }
})

