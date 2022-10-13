import type { AppConfig } from '@/interfaces/config'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'

import { useAppStore } from '@/stores/modules/app'
import { deepMerge } from '@/utils'
import { appSetting } from '@/settings/appBaseSetting'
import { Persistent } from '@/utils/cache/persistent'

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore()

  let appConfig: AppConfig = Persistent.getLocal(APP_CONFIG_KEY) as AppConfig
  appConfig = deepMerge(appSetting, appConfig || {})

  appStore.setAppConfig(appConfig)
}