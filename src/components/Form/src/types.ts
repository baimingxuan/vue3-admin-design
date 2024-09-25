import type { CSSProperties, VNode } from 'vue'
import type { RuleObject, NamePath } from 'ant-design-vue/lib/form/interface'
import type { RowProps, ColProps } from 'ant-design-vue/lib/grid'

export type RowPropsType = RowProps & { style?: CSSProperties }

export type ColPropsType = ColProps & {
  style?: CSSProperties
}

export type FieldMapToTime = [string, [string, string], (string | [string, string])?][]

export interface ActionBtnType {
  text?: string
  icon?: VNode
  show?: boolean
}

export interface FormRefType {
  submitForm: () => Promise<void>
  validateForm: <T = Recordable>(nameList?: NamePath[] | false) => Promise<T>
  resetFields: () => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  clearValidate: (name?: string | string[]) => Promise<void>
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>
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
  // Whether to disable
  disabled?: boolean
  // Whether to readonly
  readonly?: boolean
}

export interface FormPropsType {
  // Form layout
  layout?: 'inline' | 'horizontal' | 'vertical'
  // Form data binding
  model?: Recordable
  // Whether to disable
  disabled?: boolean
  // Whether to readonly
  readonly?: boolean
  // Whether to show the label colon
  colon?: boolean
  // Row configuration for the form
  rowProps?: Partial<RowPropsType>
  // Column configuration for the form
  colProps?: Partial<ColPropsType>
  // The label width of the form item
  labelWidth?: number | string
  // Label alignment
  labelAlign?: 'left' | 'right'
  // Label column configuration
  labelCol?: Partial<ColPropsType>
  // Wrapper column configuration
  wrapperCol?: Partial<ColPropsType>
  // Form configuration field list
  schemas?: FormSchemaType[]
  // Form component size
  size?: 'default' | 'small' | 'large'
  // Time interval fields are mapped into multiple
  fieldMapToTime?: FieldMapToTime
  // Auto submit on press enter
  autoSubmitOnEnter?: boolean
  // Form action column configuration
  actionColProps?: Partial<ColPropsType>
  // Submit button configuration properties
  submitBtnProps?: ActionBtnType
  // Reset button configuration properties
  resetBtnProps?: ActionBtnType
  // Whether to show the advanced button
  showAdvancedBtn?: boolean
  // Automatically collapse over the specified number of rows
  autoAdvancedRow?: number
  // Customize the submit function
  submitFunc: () => Promise<void>
  // Customize the reset function
  resetFunc: () => Promise<void>
}
