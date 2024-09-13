import type { PropType } from 'vue'
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
