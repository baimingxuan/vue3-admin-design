import { defineStore } from 'pinia'

import { ThemeMode } from '@/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    themeMode: 'dark'
  }),

  getters: {
    getThemeMode(): ThemeMode | string {
      return this.themeMode
    }
  },

  actions: {
    setThemeMode(mode: string): void {
      this.themeMode = mode
    }
  }
})