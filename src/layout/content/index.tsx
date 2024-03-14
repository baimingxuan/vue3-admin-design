import { defineComponent } from 'vue'
import Page from './components/Page'
import './index.less'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    return () => (
      <div class='layout_content'>
        <Page />
      </div>
    )
  }
})
