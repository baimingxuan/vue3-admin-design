import type { App } from 'vue'
import { createPinia } from 'pinia'

const stores = createPinia()

export function setupStore(app: App<Element>) {
    app.use(stores)
}