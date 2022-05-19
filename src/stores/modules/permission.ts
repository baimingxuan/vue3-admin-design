import { defineStore } from 'pinia'

import type { AppRoute, AppMenu } from '@/router/types'

import { filter } from '@/utils/helper/treeHelper'
import { asyncRoutes } from '@/router/routes'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menuList: []
  }),
  getters: {
    getMenuList(): AppMenu[] {
      return this.menuList
    }
  },
  actions: {
    buildRoutes(): Promise<AppRoute[]> {
      let routes: AppRoute[] = []
      routes = filter(asyncRoutes, () => true)
      return Promise.resolve(routes)
    }
  }
})

