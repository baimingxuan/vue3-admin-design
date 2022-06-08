import type { App, Plugin } from 'vue'
import { isObject } from './is'

export const withInstall = <T>(component: T, alias?: string) => {
  const compo = component as any
  compo.install = (app: App) => {
    app.component(compo.name, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}