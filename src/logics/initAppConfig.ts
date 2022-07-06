import { useAppStore } from '@/stores/modules/app'
import { AppConfig } from '@/interfaces/config'
import { Persistent } from '@/utils/cache/persistent'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'
import { deepMerge } from '@/utils'
import { appSetting } from '@/settings/appBaseSetting'

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore()

  let appConfig: AppConfig = Persistent.getLocal(APP_CONFIG_KEY) as AppConfig
  appConfig = deepMerge(appSetting, appConfig || {})

  appStore.setAppConfig(appConfig)
}