export type ThemeMode = 'dark' | 'light'

export type LocaleType = 'zh_CN' | 'en'

export type SelectOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

export interface styleState {
  fontFamily?: string
  fontSize?: string
  lineHeight?: string
  color?: string
  backgroundColor?: string
  fontWeight?: string
  fontStyle?: string
  textShadow?: string
  textAlign?: string
}

export interface LoginFormState {
  username: string
  password: string
  remember: boolean
}
