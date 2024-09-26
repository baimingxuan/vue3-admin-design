import type { PropType } from 'vue'
import type { RowPropsType, ColPropsType, FormSchemaType, ActionBtnType, FieldMapToTime } from './types/form'

export const basicFormProps = {
  layout: {
    type: String as PropType<'inline' | 'horizontal' | 'vertical'>,
    default: 'inline'
  },
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  colon: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  rowProps: {
    type: Object as PropType<Partial<RowPropsType>>,
    default: () => ({})
  },
  colProps: {
    type: Object as PropType<Partial<ColPropsType>>,
    default: () => ({})
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  labelCol: {
    type: Object as PropType<Partial<ColPropsType>>,
    default: () => ({})
  },
  wrapperCol: {
    type: Object as PropType<Partial<ColPropsType>>,
    default: () => ({})
  },
  schemas: {
    type: Array as PropType<Array<FormSchemaType>>,
    required: true,
    default: () => []
  },
  size: {
    type: String as PropType<'default' | 'small' | 'large'>,
    default: 'default'
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => []
  },
  autoSubmitOnEnter: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  actionColProps: {
    type: Object as PropType<Partial<ColPropsType>>,
    default: () => ({})
  },
  submitBtnProps: {
    type: Object as PropType<ActionBtnType>,
    default: () => ({})
  },
  resetBtnProps: {
    type: Object as PropType<ActionBtnType>,
    default: () => ({})
  },
  showAdvancedBtn: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  autoAdvancedRow: {
    type: Number as PropType<number>,
    default: 2
  },
  submitFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  },
  resetFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
}
