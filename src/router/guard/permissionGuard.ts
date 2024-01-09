import type { Router, RouteRecordRaw } from 'vue-router'

import { useUserStoreWithOut } from '@/stores/modules/user'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'

import { RootRoute, PageNotFoundRoute } from '@/router/routes'

const whiteList = ['/login']

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    if (
      from.path === RootRoute.path &&
      to.path === '/home' &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== '/home'
    ) {
      next(userStore.getUserInfo.homePath)
      return
    }

    const token = userStore.getToken
    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      if (to.path === '/login' && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      next()
      return
    }

    // Token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: '/login',
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }

      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === '/login' &&
      to.name === PageNotFoundRoute.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || '/home')
    ) {
      next(userStore.getUserInfo.homePath || '/home')
      return
    }

    // Get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach(route => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    router.addRoute(PageNotFoundRoute as unknown as RouteRecordRaw)

    if (to.name === PageNotFoundRoute.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      // const redirectPath = (from.query.redirect || to.path) as string
      // const redirect = decodeURIComponent(redirectPath)
      // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      // next(nextData)
      next()
    }
  })
}
