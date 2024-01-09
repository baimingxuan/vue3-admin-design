import type { App } from 'vue'

const pluginModules = import.meta.glob('./modules/*.ts', { eager: true }) as Object

const pluginModulesList: any[] = []

Object.keys(pluginModules).forEach(key => {
  const module = pluginModules[key].default || {}
  pluginModulesList.push(module)
})

export function setupPlugins(app: App<Element>) {
  pluginModulesList.forEach(plugin => {
    app.use(plugin)
  })
}
