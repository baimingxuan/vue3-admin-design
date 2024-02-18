import type { App } from 'vue'
import { createPinia } from 'pinia'
import { registerPiniaPersistPlugin } from './plugin/persist'

const stores = createPinia()
registerPiniaPersistPlugin(stores)

export function setupStore(app: App<Element>) {
  app.use(stores)
}

export { stores }
