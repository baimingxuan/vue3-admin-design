import { toRaw } from 'vue'
import { Memory } from './memory'
import { TOKEN_KEY, LOCALE_KEY, APP_CONFIG_KEY } from '@/enums/cacheEnum'
import { AppConfig } from '@/interfaces/config'

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

interface LocalStore {
  [TOKEN_KEY]: string | number | null | undefined
  [APP_CONFIG_KEY]: AppConfig
}

const localMemory = new Memory(DEFAULT_CACHE_TIME)

type LocalKeys = keyof LocalStore

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value))
  }
}