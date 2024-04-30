import type { LocaleType } from '@/types'
import { set } from 'lodash-es'
import { LocaleEnum } from '@/enums/appEnum'

type langLowerType = 'zh_cn' | 'zh_tw' | 'en_us'

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {}

  Object.keys(langs).forEach(key => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}

export function getBrowserLang(): LocaleType {
  const browserLang = navigator.language as LocaleType
  const lowercaseBrowserLang = browserLang?.toLowerCase() as langLowerType

  const localeMap = new Map<langLowerType, LocaleType>([
    ['zh_cn', LocaleEnum.ZH_CN],
    ['zh_tw', LocaleEnum.Zh_TW],
    ['en_us', LocaleEnum.EN_US]
  ])

  if (localeMap.has(lowercaseBrowserLang)) {
    return localeMap.get(lowercaseBrowserLang)!
  }

  if (lowercaseBrowserLang.includes('en')) {
    return LocaleEnum.EN_US
  }

  return LocaleEnum.ZH_CN
}

// This function is only used for routes. Please use useI18n for other places
export const t = (key: string) => key
