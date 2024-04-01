import type { LocaleType } from '@/types'
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { setHtmlPageLang } from '@/locales/helper'
import { genLangs } from '@/locales/langs'

export function useLocaleSetting() {
  const { locale: currentLocale, setLocaleMessage } = useI18n()
  const appStore = useAppStoreWithOut()
  const getLocale = computed(() => appStore.getAppLocale)

  async function changeLocale(locale: LocaleType) {
    if (unref(currentLocale) === locale) {
      return locale
    }

    const langModule = await genLangs(locale)
    if (!langModule) return

    setLocaleMessage(locale, langModule.message)

    appStore.setAppLocale(locale)
    setHtmlPageLang(locale)

    return locale
  }

  return {
    getLocale,
    changeLocale
  }
}
