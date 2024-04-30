import type { AppRoute } from '../types'
import { t } from '@/locales/helper'
import Layout from '@/layout'

/**
 * name: 'route-name'           the name is used by <keep-alive> (must set!!)
 * redirect: 'redirect-path'    if set, it will redirect to path (recommend set)
 * meta: {
    title: 'title'              the name show in menu and breadcrumb (must set)
    icon?: 'svg-name'            the icon show in the menu (recommend set)
    affix?: false                if set true, the tag will affix in the tags-view (default is false)
    orderNo?: 0                  menu item display order (recommend set)
    ignoreKeepAlive?: false      if set true, the page will no be cached (default is false)
    hideMenu?: false             if set true, menu item will hide in the menu (default is false)
    hideChildrenInMenu?: false   if set true, menu children will hide in the menu (default is false)
    iframeSrc?: 'iframePath'     if set, the route will be in iframe page
    isLink?: true                if set true, the route will be a external link (default is false)
    transitionName?: 'fade'      current page transition
  }
 * */

// Home page
export const RootRoute: AppRoute = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: t('routes.base.home')
  }
}

// 404 on a page
export const PageNotFoundRoute: AppRoute = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: Layout,
  meta: {
    title: t('routes.base.notFound'),
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import('@/views/redirect'),
      meta: {
        title: t('routes.base.notFound'),
        hideMenu: true
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
    title: 'Redirect',
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
      name: 'Redirect',
      component: () => import('@/views/redirect'),
      meta: {
        title: 'Redirect',
        hideMenu: true
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
    title: t('routes.exception.403')
  }
}

// Login page
export const LoginRoute: AppRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login'),
  meta: {
    title: t('routes.base.login')
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
