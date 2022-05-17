import { defineStore } from 'pinia'

import type { AppRoute, AppMenu } from '@/router/types'

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
      return Promise.resolve(routes)
    }
  }
})

