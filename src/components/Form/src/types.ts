import type { CSSProperties, VNode } from 'vue'
import type { RuleObject, NamePath } from 'ant-design-vue/lib/form/interface'

export interface ColState {
  flex?: string | number
  span?: number
  offset?: number
  order?: number
  style?: CSSProperties
}

export interface ActionBtnState {
  text?: string
  icon?: VNode
  show?: boolean
}

export interface FormRefType {
  submitForm: () => Promise<void>
  validateForm: <T = Recordable>(nameList?: NamePath[] | false) => Promise<T>
  resetFields: () => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  clearValidate: (name?: string | string[]) => void
  scrollToField: (name: NamePath, options?: ScrollOptions) => void
}

export type RegisterFn = (formInstance: FormRefType) => void

export type FormReturnType = [RegisterFn, FormRefType]

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
  colon?: boolean
  labelAlign?: 'left' | 'right'
  labelCol?: ColState
  wrapperCol?: ColState
  schemas: FormSchemaType[]
  size?: 'default' | 'small' | 'large'
  // Form action props
  submitBtn?: ActionBtnState
  resetBtn?: ActionBtnState
  showAdvanced?: boolean
  sbumitFunc: () => Promise<void>
  resetFunc: () => Promise<void>
}
