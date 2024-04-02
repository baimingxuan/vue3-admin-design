import type { LocaleType } from '@/types'
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setHtmlPageLang } from '@/locales/helper'
import { genLangs } from '@/locales/langs'
import { LOCALE_KEY } from '@/enums/cacheEnum'
import { createLocalStorage } from '@/utils/cache'
import { getBrowserLang } from '@/locales/helper'

const ls = createLocalStorage()

export function useLocaleSetting() {
  const { locale: currentLocale, setLocaleMessage } = useI18n()
  const getLocale = computed(() => ls.get(LOCALE_KEY) || getBrowserLang())

  async function changeLocale(locale: LocaleType) {
    if (unref(currentLocale) === locale) {
      return locale
    }

    const langModule = genLangs(locale)
    if (!langModule) return

    setLocaleMessage(locale, langModule.message)

    ls.set(LOCALE_KEY, locale)
    setHtmlPageLang(locale)

    return locale
  }

  return {
    getLocale,
    changeLocale
  }
}
