import type { Router, RouteRecordRaw } from 'vue-router'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    if (from.path === '/' && to.path === '/home') {
      next('/home')
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach(route => {
        router.addRoute(route as RouteRecordRaw)
    })
    next('/')
  })
}
