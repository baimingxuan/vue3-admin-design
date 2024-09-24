import type { PropType } from 'vue'
import type { ColState, FormSchemaType, ActionBtnState } from './types'

export const formProps = {
  layout: {
    type: String as PropType<'inline' | 'horizontal'>,
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
    type: Object as PropType<ColState>,
    default: () => ({
      style: {
        width: '80px'
      }
    })
  },
  wrapperCol: {
    type: Object as PropType<ColState>,
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
  submitBtn: {
    type: Object as PropType<ActionBtnState>,
    default: () => ({})
  },
  resetBtn: {
    type: Object as PropType<ActionBtnState>,
    default: () => ({})
  },
  showAdvanced: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  sbumitFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  },
  resetFunc: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
}
