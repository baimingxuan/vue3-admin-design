import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { useAppStoreWithOut } from '@/stores/modules/app'

async function createI18nOptions(): Promise<I18nOptions> {
  const appStore = useAppStoreWithOut()
  const locale = appStore.getAppLocale
  const defaultLocal = await import(`./langs/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)

  return {
    legacy: false,
    locale,
    fallbackLocale: 'zh_CN',
    messages: {
      [locale]: message
    },
    availableLocales: ['zh_CN', 'zh_TW', 'en_US'],
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true // true - warning off
  }
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  const i18n = createI18n(options)
  app.use(i18n)
}
