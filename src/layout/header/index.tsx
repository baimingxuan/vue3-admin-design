import { defineComponent } from 'vue'
import BasicHeader from './BasicHeader'
import HybridHeader from './HybridHeader'

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    isHeaderMenu: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return () => (props.isHeaderMenu ? <HybridHeader /> : <BasicHeader />)
  }
})
