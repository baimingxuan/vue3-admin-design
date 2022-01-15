import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/index.css'
import { setupRouter } from './router'

function launchApp() {
    const app = createApp(App)
    setupRouter(app)
    app.mount('#app')
}

launchApp()
