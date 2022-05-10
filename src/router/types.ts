import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

// RouteRecordRaw detail, see: https://router.vuejs.org/api/#routerecordraw
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    component?: Component | string
    children?: AppRouteRecordRaw[]
    fullPath?: string
}

export interface Menu {
    name: string
    path: string
    icon?: string
    disabled?: boolean
    children?: Menu[]
    orderNo?: number
    meta?: Partial<RouteMeta>
    hideMenu?: boolean
}
