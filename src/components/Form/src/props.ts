import type { PropType } from 'vue'
import type { ColPropsType, FormSchemaType, ActionBtnType } from './types/form'

export const formProps = {
  layout: {
    type: String as PropType<'inline' | 'horizontal' | 'vertical'>,
    default: 'inline'
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
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  labelCol: {
    type: Object as PropType<ColPropsType>,
    default: () => ({
      style: {
        width: '80px'
      }
    })
  },
  wrapperCol: {
    type: Object as PropType<ColPropsType>,
    default: () => ({
      style: {
        width: '190px',
        flexGrow: 0
      }
    })
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
  submitFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  },
  resetFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
}
