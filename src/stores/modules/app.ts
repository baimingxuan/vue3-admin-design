import type { ThemeMode } from '@/types'
import type { AppConfig, HeaderSetting, MenuSetting, TransitionSetting } from '@/types/config'
import type { AppModeEnum, ThemeEnum } from '@/enums/appEnum'
import { defineStore } from 'pinia'
import { stores } from '../index'
import { resetRouter } from '@/router'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { APP_CONFIG_KEY, APP_MODE_KEY } from '@/enums/cacheEnum'
import { baseAppMode } from '@/settings/designSetting'

interface AppState {
  appMode?: AppModeEnum

  themeMode?: ThemeEnum

  appConfig: AppConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appMode: undefined,
    themeMode: undefined,
    appConfig: Persistent.getLocal(APP_CONFIG_KEY)
  }),

  getters: {
    getAppMode(): AppModeEnum | string {
      return this.appMode || localStorage.getItem(APP_MODE_KEY) || baseAppMode
    },
    getThemeMode(): ThemeMode | string {
      return this.themeMode || ''
    },
    getAppConfig(): AppConfig {
      return this.appConfig || ({} as AppConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getAppConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getAppConfig.menuSetting
    },
    getTransitionSetting(): TransitionSetting {
      return this.getAppConfig.transitionSetting
    }
  },

  actions: {
    setAppMode(mode: AppModeEnum): void {
      this.appMode = mode
      localStorage.setItem(APP_MODE_KEY, mode)
    },
    setThemeMode(mode: ThemeEnum): void {
      this.themeMode = mode
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config)
      Persistent.setLocal(APP_CONFIG_KEY, this.appConfig, true)
    },
    async resetState() {
      resetRouter()
      Persistent.clearAll()
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(stores)
}
