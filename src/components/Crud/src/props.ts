import type { PropType } from 'vue'
import type { ColState, FormPropType } from './types/form'
import type { TableConfigType } from './types/crud'

export const basicProps = {
  // Whether to show the aside tree
  showTree: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // Whether to show the search form
  showForm: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // Section table configuration
  tableConfig: {
    type: Object as PropType<TableConfigType>,
    default: () => ({})
  }
}

export const formProps = {
  layout: {
    type: String as PropType<'inline' | 'horizontal'>,
    default: 'inline'
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  labelCol: {
    type: Object as PropType<ColState>,
    default: () => ({ span: 6 })
  }
}
