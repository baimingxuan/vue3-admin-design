import { defineStore } from 'pinia'

import type { AppConfig, MenuSetting } from '@/interfaces/config'

import { ThemeMode } from '@/types'
import { ThemeEnum } from '@/enums/appEnum'

interface AppState {
  themeMode?: ThemeEnum

  appConfig: AppConfig
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    themeMode: undefined,
    appConfig: {} as AppConfig
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
    }
  }
})