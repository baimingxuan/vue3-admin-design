import type { AppRouteRecordRaw } from '../types'
import Layout from '../../layout/index.vue'
import { asyncRoutes } from './routeList'

export const HomeRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
        title: '首页',
        icon: 'vue-dsn-icon-index',
        hideChildrenInMenu: false
    },
    children: [
        {
            path: 'home',
            name: 'Home',
            component: () => import('../../views/home.vue'),
            meta: {
                title: '首页',
                icon: 'vue-dsn-icon-index',
                fixed: true,
                hideMenu: false,
                hideChildrenInMenu: false
            }
        }
    ]
}

export const basicRoutes = [
    HomeRoute,
    ...asyncRoutes
]
