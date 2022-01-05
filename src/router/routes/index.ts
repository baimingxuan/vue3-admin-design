import type { AppRouteRecordRaw } from '../types'

export const HomeRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Home',
    redirect: '/home',
    meta: {
        title: 'Home'
    }
}

export const basicRoutes = [
    HomeRoute
]
