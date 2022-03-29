import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

import { createApp } from 'vue'
import App from './App.vue'
// CSS resets
import 'normalize.css/normalize.css'
// element-plus CSS
import 'element-plus/theme-chalk/index.css'
import { setupRouter } from './router'
import { setupStore } from '@/store'

function launchApp() {
    const app = createApp(App)

    // Configure router
    setupRouter(app)

    // Configure store
    setupStore(app)

    app.mount('#app')
}

launchApp()
