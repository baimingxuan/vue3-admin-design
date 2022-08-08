import type { AppRoute } from '../types'
import Layout from '../../layout/index.vue'

/**
 * meta: {
    title: 'title'              the name show in menu and breadcrumb (recommend set)
    icon: 'icon-name'           the icon show in the menu
    affix: false                if set true, the tag will affix in the tags-view (default is false)     
    hideMenu: false             if set true, menu item will hide in the menu (default is false)
    hideChildrenInMenu: false   if set true, menu children will hide in the menu (default is false)
    hideBreadcrumb: false       if set true, breadcrumb will hide in the item (default is false)
    orderNo: 0                  menu item display sequence
  }
 * */

// home page
export const HomeRoute: AppRoute = {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
        title: '首页',
        icon: 'home',
        affix: true
    },
    children: [
        {
            path: 'home',
            name: 'Home',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '首页',
                icon: 'home',
                affix: true
            }
        }
    ]
}

// 404 on a page
export const PageNotFoundRoute: AppRoute = {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: Layout,
    meta: {
        title: '错误页面',
        hideBreadcrumb: true,
        hideMenu: true,
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'PageNotFound',
            meta: {
                title: '错误页面',
                hideBreadcrumb: true,
                hideMenu: true,
            }
        }
    ]
}

// redirect page
export const RedirectRoute: AppRoute = {
    path: '/redirect',
    name: 'RedirectTo',
    component: Layout,
    meta: {
        title: '重定向页面',
        hideBreadcrumb: true,
        hideMenu: true
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: 'RedirectTo',
            component: () => import('@/views/redirect.vue'),
            meta: {
                title: '重定向页面',
                hideBreadcrumb: true,
                hideMenu: true
            }
        }
    ]
}

const routeModules = import.meta.glob('./modules/*.ts', { eager: true }) as Object
console.log('routeModules', routeModules)

const routeModulesList: AppRoute[] = []

Object.keys(routeModules).forEach(key => {
    const module = routeModules[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    routeModulesList.push(...moduleList)
})

export const asyncRoutes = [
    HomeRoute,
    ...routeModulesList
]
