import type { AppRoute } from '../types'
import Layout from '@/layout'

/**
 * Note: subMenu only appear when route children.length > 1
 *
 * name: 'route-name'           the name is used by <keep-alive> (must set!!)
 * redirect: 'redirect-path'    if set, it will redirect to path (recommend set)
 * meta: {
    title: 'title'              the name show in menu and breadcrumb (recommend set)
    icon: 'svg-name'            the icon show in the menu (recommend set)
    affix: false                if set true, the tag will affix in the tags-view (default is false)
    orderNo: 0                  menu item display order (recommend set)
    ignoreKeepAlive: false      if set true, the page will no be cached (default is false)
    hideMenu: false             if set true, menu item will hide in the menu (default is false)
    hideChildrenInMenu: false   if set true, menu children will hide in the menu (default is false)
    hideBreadcrumb: false       if set true, breadcrumb will hide in the item (default is false)
  }
 * */

// Home page
export const RootRoute: AppRoute = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: '首页'
  }
}

// 404 on a page
export const PageNotFoundRoute: AppRoute = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: Layout,
  meta: {
    title: '错误页面',
    hideMenu: true,
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import('@/views/redirect'),
      meta: {
        title: '错误页面',
        hideMenu: true,
        hideBreadcrumb: true
      }
    }
  ]
}

// Redirect page
export const RedirectRoute: AppRoute = {
  path: '/redirect',
  name: 'RedirectTo',
  component: Layout,
  meta: {
    title: '重定向页面',
    hideMenu: true,
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'RedirectTo',
      component: () => import('@/views/redirect'),
      meta: {
        title: '重定向页面',
        hideMenu: true,
        hideBreadcrumb: true
      }
    }
  ]
}

export const NotAuthRoute: AppRoute = {
  path: '/403',
  name: 'NotAuth',
  component: () => import('@/views/exception/index'),
  props: {
    status: 403,
    withCard: false
  },
  meta: {
    title: '403页面'
  }
}

// Login page
export const LoginRoute: AppRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/lock'),
  meta: {
    title: '登录页'
  }
}

const routeModules = import.meta.glob('./modules/*.ts', { eager: true }) as Object

const routeModulesList: AppRoute[] = []

Object.keys(routeModules).forEach(key => {
  const module = routeModules[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  routeModulesList.push(...moduleList)
})

// Async routes with permission
export const asyncRoutes = [PageNotFoundRoute, RedirectRoute, ...routeModulesList]

// Basic routes without permission
export const basicRoutes = [LoginRoute, RootRoute, RedirectRoute, NotAuthRoute, ...routeModulesList]
