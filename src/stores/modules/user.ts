import type { LoginFormState, UserInfo } from '@/types'
import { h } from 'vue'
import { defineStore } from 'pinia'
import { stores } from '../index'
import { router } from '@/router'
import { loginApi, getUserInfo, logoutApi } from '@/api'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { setAuthCache, getAuthCache } from '@/utils/auth'
import { useMessage } from '@/hooks/web/useMessage'
import { i18n } from '@/locales'

const { t } = i18n.global

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
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : ''
      setAuthCache(TOKEN_KEY, token)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = undefined
      this.sessionTimeout = false
      this.lastUpdateTime = 0
    },
    async login(
      params: LoginFormState & {
        goHome?: boolean
      }
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, ...loginParams } = params
        const data = await loginApi(loginParams)
        const { token } = data

        // Save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.getToken) return null

      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        goHome && (await router.replace(userInfo?.homePath || '/home'))
      }

      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null

      const userInfo = await getUserInfo()

      this.setUserInfo(userInfo)

      return userInfo
    },
    // Confirm before logging out
    confirmLogout() {
      const { createConfirm } = useMessage()

      createConfirm({
        iconType: 'warning',
        title: () => h('span', `${t('system.app.logoutTip')}`),
        content: () => h('span', `${t('system.app.logoutMsg')}`),
        onOk: async () => {
          await this.logout(true)
        }
      })
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logoutApi()
        } catch (error) {
          const { createMessage } = useMessage()
          createMessage.error(`${t('system.app.logoutError')}`)
        }
      }
      this.setUserInfo(null)
      this.setToken(undefined)
      this.setSessionTimeout(false)
      goLogin && router.push('/login')
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(stores)
}
