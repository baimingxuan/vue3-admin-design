import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '@/design/index.less'
import 'virtual:windi-utilities.css'

// register svg icon
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { initAppConfigStore } from '@/logics/initAppConfig'

import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import { setupRouter, router } from './router'
import { setupStore } from '@/stores'
import { setupRouterGuard } from '@/router/guard'

function launchApp() {
    const app = createApp(App)

    // Configure router
    setupRouter(app)

    setupRouterGuard(router)

    // Configure store
    setupStore(app)

    // Initialize internal system configuration
    initAppConfigStore()

    app.mount('#app')
}

launchApp()
