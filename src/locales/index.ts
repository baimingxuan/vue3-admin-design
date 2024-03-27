import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { LocaleEnum } from '@/enums/appEnum'
import { localePool } from '@/settings/localeSetting'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang } from './helper'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { genLangs } from './langs'

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {
  const appStore = useAppStoreWithOut()
  const locale = appStore.getAppLocale
  const defaultLocal = await genLangs(locale)
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

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
