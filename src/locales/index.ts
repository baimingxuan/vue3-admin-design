import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { LocaleEnum } from '@/enums/appEnum'
import { LOCALE_KEY } from '@/enums/cacheEnum'
import { localePool } from '@/settings/localeSetting'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, getBrowserLang } from './helper'
import { createLocalStorage } from '@/utils/cache'
import { genLangs } from './langs'

const ls = createLocalStorage()

function createI18nOptions(): I18nOptions {
  const locale = ls.get(LOCALE_KEY) || getBrowserLang()
  const defaultLocal = genLangs(locale)
  const message = defaultLocal?.message ?? {}

  setHtmlPageLang(locale)

  return {
    legacy: false,
    locale,
    fallbackLocale: LocaleEnum.ZH_CN,
    messages: {
      [locale]: message
    },
    // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    sync: true,
    availableLocales: localePool,
    // Whether to cancel the warning output when localization fails, true - warning off
    silentTranslationWarn: true
  }
}

function createI18nInstance() {
  const options = createI18nOptions()
  return createI18n(options)
}

export const i18n = createI18nInstance()

export function setupI18n(app: App) {
  app.use(i18n)
}
