import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: basicRoutes as unknown as RouteRecordRaw[],
    strict: true
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}
