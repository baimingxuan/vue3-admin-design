import type { PropType } from 'vue'
import type { ColState, FormSchemaType } from './types'

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
    required: true
  }
}
