import type { AppConfig } from '@/types/config'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'
import { updateDarkTheme } from '@/logics/theme/mode'
import { useAppStore } from '@/stores/modules/app'
import { deepMerge } from '@/utils'
import { appSetting } from '@/settings/appBaseSetting'
import { Persistent } from '@/utils/cache/persistent'

// Initial project configuration
export function initAppConfigStore() {
  const appStore = useAppStore()

  const appMode = appStore.getAppMode
  updateDarkTheme(appMode)

  let appConfig: AppConfig = Persistent.getLocal(APP_CONFIG_KEY) as AppConfig
  appConfig = deepMerge(appSetting, appConfig || {})

  appStore.setAppConfig(appConfig)
}
