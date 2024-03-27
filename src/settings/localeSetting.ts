import type { LocaleType } from '@/types'
import { LocaleEnum } from '@/enums/appEnum'

interface DropMenu {
  text: string
  event: LocaleEnum
  onClick?: Fn
}

export const localePool: LocaleType[] = [LocaleEnum.ZH_CN, LocaleEnum.Zh_TW, LocaleEnum.EN_US]

export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LocaleEnum.ZH_CN
  },
  {
    text: '繁體中文',
    event: LocaleEnum.Zh_TW
  },
  {
    text: 'English',
    event: LocaleEnum.EN_US
  }
]
