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
    default: () => ({
      style: { width: '100%' }
    })
  },
  colProps: {
    type: Object as PropType<Partial<ColPropsType>>,
    default: () => ({
      span: 4
    })
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80
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
  rulesMessageJoinLabel: {
    type: Boolean as PropType<boolean>,
    default: true
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
    default: () => ({
      text: '查询',
      show: true
    })
  },
  resetBtnProps: {
    type: Object as PropType<ActionBtnType>,
    default: () => ({
      text: '重置',
      show: true
    })
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
  },
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date
    }
  }
}
