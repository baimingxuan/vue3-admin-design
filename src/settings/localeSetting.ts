enum LOCALE {
  ZH_CN = 'zh_CN',
  Zh_HK = 'zh_HK',
  EN_US = 'en_US'
}
interface DropMenu {
  text: string
  event: LOCALE
  onClick?: Fn
}

export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN
  },
  {
    text: '繁體中文',
    event: LOCALE.Zh_HK
  },
  {
    text: 'English',
    event: LOCALE.EN_US
  }
]
