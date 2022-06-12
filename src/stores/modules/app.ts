import { defineStore } from 'pinia'

import type { AppConfig, MenuSetting } from '@/interfaces/config'

import { ThemeMode } from '@/types'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@antfu/utils'
import { Persistent } from '@/utils/cache/persistent'

interface AppState {
  themeMode?: ThemeEnum

  appConfig: AppConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    themeMode: undefined,
    appConfig: Persistent.getLocal('APP_CONFIG_KEY')
  }),

  getters: {
    getThemeMode(): ThemeMode | string {
      return this.themeMode || ''
    },
    getMenuSetting(): MenuSetting {
      return this.appConfig.menuSetting
    }
  },

  actions: {
    setThemeMode(mode: ThemeEnum): void {
      this.themeMode = mode
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config)
      Persistent.setLocal('APP_CONFIG_KEY', this.appConfig)
    }
  }
})