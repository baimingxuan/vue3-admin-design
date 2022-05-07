import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

// register svg icon
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
import { setupRouter } from './router'
import { setupStore } from '@/stores'

function launchApp() {
    const app = createApp(App)

    // Configure router
    setupRouter(app)

    // Configure store
    setupStore(app)

    app.mount('#app')
}

launchApp()
