import type { AppConfig } from '@/interfaces/config'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'

import { useAppStore } from '@/stores/modules/app'
import { deepMerge } from '@/utils'
import { appSetting } from '@/settings/appBaseSetting'

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore()

  let appConfig: AppConfig = JSON.parse(localStorage.getItem(APP_CONFIG_KEY)!)
  appConfig = deepMerge(appSetting, appConfig || {})

  appStore.setAppConfig(appConfig)
}