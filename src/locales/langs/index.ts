import type { LocaleType } from '@/types'
import { genMessage } from '../helper'

const modules = {
  en_US: import.meta.glob('./en_US/**/*.json', { eager: true }),
  zh_CN: import.meta.glob('./zh_CN/**/*.json', { eager: true }),
  zh_TW: import.meta.glob('./zh_TW/**/*.json', { eager: true })
}

export function genLangs(lang: LocaleType) {
  return {
    message: {
      ...genMessage(modules[lang] as Recordable<Recordable>, lang)
    }
  }
}
