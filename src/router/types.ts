import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import type { defineComponent } from 'vue'

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
  props?: Recordable
  fullPath?: string
}

export interface AppMenu {
  name: string
  path: string
  children?: AppMenu[]
  meta?: Partial<RouteMeta>
  icon?: string
  affix?: boolean
  orderNo?: number
  ignoreKeepAlive?: boolean
  hideMenu?: boolean
  hideChildrenInMenu?: boolean
}
