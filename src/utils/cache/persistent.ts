import type { RouteLocationNormalized } from 'vue-router'

import { toRaw } from 'vue'
import { Memory } from './memory'
import type { AppConfig } from '@/types/config'
import {
  type TOKEN_KEY,
  type USER_INFO_KEY,
  type APP_CONFIG_KEY,
  type APP_TAGS_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  type LOCK_INFO_KEY
} from '@/enums/cacheEnum'
import { createLocalStorage, createSessionStorage } from '@/utils/cache'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'
import type { UserInfo, LockInfo } from '@/types'

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined
  [USER_INFO_KEY]: UserInfo
  [APP_CONFIG_KEY]: AppConfig
  [LOCK_INFO_KEY]: LockInfo
  [APP_TAGS_KEY]: RouteLocationNormalized[]
}

type LocalStore = BasicStore
type SessionStore = BasicStore

export type BasicKeys = keyof BasicStore
type LocalKeys = keyof LocalStore
type SessionKeys = keyof SessionStore

const ls = createLocalStorage()
const ss = createSessionStorage()

const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY)
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
  localCache && localMemory.resetCache(localCache)
  sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value))
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key)
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache)
  }

  static clearLocal(immediate = false): void {
    localMemory.clear()
    immediate && ls.clear()
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value))
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key)
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache)
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear()
    immediate && ss.clear()
  }

  static clearAll(immediate = false) {
    sessionMemory.clear()
    localMemory.clear()
    if (immediate) {
      ls.clear()
      ss.clear()
    }
  }
}

function storageChange(e: any) {
  const { key, newValue, oldValue } = e

  if (!key) {
    Persistent.clearAll()
    return
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal()
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession()
    }
  }
}

window.addEventListener('storage', storageChange)

initPersistentMemory()
