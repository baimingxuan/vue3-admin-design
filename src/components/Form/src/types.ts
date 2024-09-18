import type { CSSProperties } from 'vue'
import type { RuleObject } from 'ant-design-vue/es/form'

export interface ColState {
  flex?: string | number
  span?: number
  offset?: number
  order?: number
  style?: CSSProperties
}

export interface FormSchemaType {
  // Field name
  field: string
  // Variable name bound to v-model Default value
  valueField?: string
  // Default value
  defaultValue?: any
  // Label name
  label?: string
  // Validation rules
  rules?: RuleObject[]
  // Event name triggered by internal value change, default change
  changeEvent?: string
  // Component type
  component?: string
  // Component props
  componentProps?: object
  // Whether to display
  isShow?: boolean
  // Whether to render
  isRender?: boolean
  disabled?: boolean
  readonly?: boolean
}

export interface FormPropType {
  layout?: 'inline' | 'horizontal'
  disabled?: boolean
  readonly?: boolean
  labelAlign?: 'left' | 'right'
  labelCol?: ColState
  wrapperCol?: ColState
  schemas: FormSchemaType[]
  size?: 'default' | 'small' | 'large'
}
