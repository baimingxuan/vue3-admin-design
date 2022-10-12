import { isDevMode } from '../env'
import { createStorage as create, CreateStorageParams } from './storageCache'

type Options = Partial<CreateStorageParams>

const enableStorageEncrypt = !isDevMode()
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // No encryption in debug mode
    hasEncrypt: enableStorageEncrypt,
    storage,
    prefixKey: 'vue-admin-design',
    ...options
  }
}

const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}
  
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage