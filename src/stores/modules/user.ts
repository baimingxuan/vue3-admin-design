import type { UserInfo } from '@/interfaces'

import { defineStore } from 'pinia'
import { stores } from '../index'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo() {
      return this.userInfo || {}
    },
    getToken() {
      return this.token
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {

  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(stores)
}