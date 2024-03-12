/**
 * used to monitor routing changes to change the status of menus and tags.
 * there is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow.
 */

import { mitt } from '@/utils/mitt'
import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute } from '@/utils'

const key = Symbol()

const emitter = mitt<{
  [key]: RouteLocationNormalized
}>()

let lastChangeTag: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const route = getRawRoute(lastChangeRoute)
  emitter.emit(key, route)
  lastChangeTag = route
}

export function listenerRouteChange(callback: (route: RouteLocationNormalized) => void, immediate = true) {
  emitter.on(key, callback)
  immediate && lastChangeTag && callback(lastChangeTag)
}

export function removeRouteChange() {
  emitter.clear()
}
