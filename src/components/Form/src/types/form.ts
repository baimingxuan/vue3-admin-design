import type { CSSProperties, VNode } from 'vue'
import type { RuleObject, NamePath } from 'ant-design-vue/lib/form/interface'
import type { RowProps, ColProps } from 'ant-design-vue/lib/grid'
import type { ComponentProps, ComponentType } from './'

export type RowPropsType = RowProps & { style?: CSSProperties }

export type ColPropsType = ColProps & {
  style?: CSSProperties
}

export type FieldMapToTime = [string, [string, string], (string | [string, string])?][]

export type RenderOpts = {
  disabled: boolean
  [key: string]: any
}

export interface ActionBtnType {
  text?: string
  icon?: VNode
  show?: boolean
}

export interface FormRefType {
  setFormProps: (props: Partial<FormPropsType>) => Promise<void>
  submitForm: () => Promise<void>
  validateForm: <T = Recordable>(nameList?: NamePath[] | false | undefined) => Promise<T>
  resetFields: () => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  clearValidate: (name?: string | string[]) => Promise<void>
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>
  resetSchemas: (schema: Partial<FormSchemaInnerType> | Partial<FormSchemaInnerType>[]) => Promise<void>
}

export type RegisterFn = (formInstance: FormRefType) => void

export type FormReturnType = [RegisterFn, FormRefType]

export interface RenderCallbackParams {
  schema: FormSchemaInnerType
  values: Recordable
  model: Recordable
  field: string
}

interface ItemPropsType {
  // Whether to show the label colon
  colon?: boolean
  // Validation rules of form
  rules?: object | object[]
  // Label name
  label?: string
  // Label alignment
  labelAlign?: 'left' | 'right'
  // Label column configuration
  labelCol?: Partial<ColPropsType>
  // Validation status
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'
}

interface BaseFormSchemaType<T extends ComponentType = any> {
  // Field name
  field: string
  // Multiple components, extra fields name
  fields?: string[]
  // Variable name bound to v-model default value
  valueField?: string
  // Default value
  defaultValue?: any
  // Multiple components, extra fields default value object
  defaultValueObj?: { [key: string]: any }
  // Whether the default values for Date components are handled automatically
  isHandleDateDefaultValue?: boolean
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // Label name
  label?: string
  // Label width, the labelCol and WrapperCol configured props will be invalid
  labelWidth?: string | number
  // Validation rules
  rules?: RuleObject[]
  // Whether the valida information is added to the label
  rulesMessageJoinLabel?: boolean
  // Event name triggered by internal value change, default change
  changeEvent?: string
  // Component type
  component?: string
  // Component properties
  componentProps?:
    | ((opt: { schema: FormSchemaType; formModel: Recordable; formRef: FormRefType }) => ComponentProps[T])
    | ComponentProps[T]
  // Col properties outside formItem
  colProps?: Partial<ColPropsType>
  // FormItem properties
  itemProps?: Partial<ItemPropsType>
  // Suffix content
  suffixContent?: string | number | ((values: RenderCallbackParams) => string | number)
  // Rendering col content requires outer wrapper formItem
  renderColContent?: (renderCallbackParams: RenderCallbackParams, opts: RenderOpts) => VNode | VNode[] | string
  // Render the content in the formItem
  renderComponent?: (renderCallbackParams: RenderCallbackParams, opts: RenderOpts) => VNode | VNode[] | string
  // Render the component content in the formItem
  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams, opts: RenderOpts) => any)
    | VNode
    | VNode[]
    | string
  // Custom slot in Col, similar to renderColContent
  colSlot?: string
  // Whether to display
  isShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // Whether to render
  isRender?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
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

export interface ComponentFormSchemaType<T extends ComponentType = any> extends BaseFormSchemaType<T> {
  // render component
  component: T
}

export interface SlotFormSchemaType extends BaseFormSchemaType {
  // render slot
  slot: string
}

export type FormSchemaType = ComponentFormSchemaType | SlotFormSchemaType

export type FormSchemaInnerType = Partial<ComponentFormSchemaType> & Partial<SlotFormSchemaType> & BaseFormSchemaType
