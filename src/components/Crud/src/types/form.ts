import type { CSSProperties } from 'vue'

export interface ColState {
  flex?: string | number
  span?: number
  offset?: number
  order?: number
  style?: CSSProperties
}

export interface FormPropType {
  layout?: 'inline' | 'horizontal'
  model?: Recordable
  disabled?: boolean
  labelAlign: 'left' | 'right'
  labelCol: ColState
  wrapperCol: ColState
}

export interface schemaType {
  type: string
  label: string
  value: string | number | boolean
  rules?: Array<{
    required?: boolean
    message?: string
  }>
  props?: object
}

export interface formType {
  [key: string]: schemaType
}
