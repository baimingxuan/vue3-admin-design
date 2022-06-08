import { defineStore } from 'pinia'

import type { AppConfig, MenuSetting } from '@/interfaces/config'

import { ThemeMode } from '@/types'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@antfu/utils'

interface AppState {
  themeMode?: ThemeEnum

  appConfig: AppConfig | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    themeMode: undefined,
    appConfig: localStorage.getItem('app_cfg_')
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
      localStorage.setItem('app_cfg_', this.appConfig)
    }
  }
})