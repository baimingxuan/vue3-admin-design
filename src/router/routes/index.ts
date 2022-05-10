import type { AppRoute } from '../types'
import Layout from '../../layout/index.vue'
import { asyncRoutes } from './routeList'

/**
 * meta: {
    title: 'title'              the name show in menu and breadcrumb (recommend set)
    icon: 'icon-name'           the icon show in the menu
    affix: false                if set true, the tag will affix in the tags-view (default is false)     
    hideMenu: false             if set true, menu item will hide in the menu (default is false)
    hideChildrenInMenu: false   if set true, menu children will hide in the menu (default is false)
    orderNo: 0                  menu item display sequence
  }
 * */

export const HomeRoute: AppRoute = {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [
        {
            path: 'home',
            name: 'Home',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '首页',
                icon: 'vue-dsn-icon-index',
                affix: true
            }
        }
    ]
}

export const basicRoutes = [
    HomeRoute,
    ...asyncRoutes
]
