import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

function launchApp() {
    const app = createApp(App)
    setupRouter(app)
    app.mount('#app')
}

launchApp()
