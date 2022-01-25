import type { AppRouteRecordRaw } from '../types'
import Layout from '../../layout/index.vue'

export const HomeRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
        title: '首页',
        icon: 'vue-dsn-icon-index',
        hideChildrenInMenu: true
    },
    children: [{
        path: 'home',
        name: 'Home',
        component: () => import('../../views/home.vue'),
        meta: {
            title: '首页',
            icon: 'vue-dsn-icon-index',
            fixed: true,
            hideMenu: true
        }
    }]
}

export const basicRoutes = [
    HomeRoute
]
