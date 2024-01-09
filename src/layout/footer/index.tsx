import { defineComponent } from 'vue'
import { LayoutFooter } from 'ant-design-vue'

export default defineComponent({
  name: 'LayoutFooters',
  setup() {
    return () => (
      <LayoutFooter>
        <div>Copyright &copy;2022 baimingxuan</div>
      </LayoutFooter>
    )
  }
})
