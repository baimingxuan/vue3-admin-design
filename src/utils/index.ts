import type { App, Plugin } from 'vue'

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