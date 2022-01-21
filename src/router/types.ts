import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'children'> {
    path: string
    name: string
    component?: Component | string
    children?: AppRouteRecordRaw[]
    meta: RouteMeta
    fullPath?: string
    redirect?: string
    hidden?: boolean
}

export interface Menu {
    path: string
    name: string
    component?: Component | string
    children?: AppRouteRecordRaw[]
    meta: RouteMeta
    fullPath?: string
    redirect?: string
    hidden?: boolean
}
