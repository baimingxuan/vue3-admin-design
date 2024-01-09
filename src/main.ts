// import 'ant-design-vue/dist/antd.css'

import '@/design/index.less'

// register svg icon
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { initAppConfigStore } from '@/logics/initAppConfig'

import App from './App'

import { setupRouter, router } from './router'
import { setupStore } from '@/stores'
import { setupRouterGuard } from '@/router/guard'
import { setupPlugins } from '@/plugins'

function launchApp() {
  const app = createApp(App)

  // Configure router
  setupRouter(app)

  setupRouterGuard(router)

  // Configure store
  setupStore(app)

  setupPlugins(app)

  // Initialize internal system configuration
  initAppConfigStore()

  app.mount('#app')
}

launchApp()
