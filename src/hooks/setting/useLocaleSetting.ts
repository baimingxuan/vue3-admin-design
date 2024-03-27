import type { LocaleType } from '@/types'
import { i18n } from '@/locales'
import { unref, computed } from 'vue'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { setHtmlPageLang } from '@/locales/helper'
import { genLangs } from '@/locales/langs'

export function useLocaleSetting() {
  const appStore = useAppStoreWithOut()
  const getLocale = computed(() => appStore.getAppLocale)

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)

    if (currentLocale === locale) {
      return locale
    }

    const langModule = await genLangs(locale)
    if (!langModule) return

    globalI18n.setLocaleMessage(locale, langModule.message)

    if (i18n.mode === 'legacy') {
      i18n.global.locale = locale
    } else {
      ;(i18n.global.locale as any).value = locale
    }

    appStore.setAppLocale(locale)
    setHtmlPageLang(locale)

    return locale
  }

  return {
    getLocale,
    changeLocale
  }
}
