/**
 * used to monitor routing changes to change the status of menus and tabs.
 * there is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow.
*/

import mitt from '@/utils/mitt'
import type { RouteLocationNormalized } from 'vue-router'

const emitter = mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized


export function listenerRouteChange(
  callback: (route) => void,
  immediate = true
) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}