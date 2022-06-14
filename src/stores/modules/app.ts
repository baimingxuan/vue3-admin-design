import { defineStore } from 'pinia'

import type { AppConfig, MenuSetting } from '@/interfaces/config'

import { ThemeMode } from '@/types'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { APP_CONFIG_KEY } from '@/enums/cacheEnum'

interface AppState {
  themeMode?: ThemeEnum

  appConfig: AppConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    themeMode: undefined,
    appConfig: Persistent.getLocal(APP_CONFIG_KEY)
  }),

  getters: {
    getThemeMode(): ThemeMode | string {
      return this.themeMode || ''
    },
    getAppConfig(): AppConfig {
      return this.appConfig || ({} as AppConfig)
    },
    getMenuSetting(): MenuSetting {
      return this.getAppConfig.menuSetting
    }
  },

  actions: {
    setThemeMode(mode: ThemeEnum): void {
      this.themeMode = mode
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config)
      Persistent.setLocal(APP_CONFIG_KEY, this.appConfig)
    }
  }
})