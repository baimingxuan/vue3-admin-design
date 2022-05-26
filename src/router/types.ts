import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

// RouteRecordRaw detail, see: https://router.vuejs.org/api/#routerecordraw
export interface AppRoute extends Omit<RouteRecordRaw, 'children'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRoute[]
    fullPath?: string
}

export interface AppMenu {
    name: string
    path: string
    icon?: string
    disabled?: boolean
    children?: AppMenu[]
    orderNo?: number
    meta?: Partial<RouteMeta>
    hideMenu?: boolean
}

export interface AppMenuModule {
    orderNo?: number
    menu: AppMenu
}