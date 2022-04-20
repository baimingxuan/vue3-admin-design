export type ThemeMode = 'dark' | 'light'

export type LocaleType = 'zh_CN' | 'en'

export type SelectOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]