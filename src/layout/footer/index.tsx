import { defineComponent } from 'vue'
import { LayoutFooter as AntdFooter } from 'ant-design-vue'

export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    return () => (
      <AntdFooter>
        <div>Copyright &copy;2022 baimingxuan</div>
      </AntdFooter>
    )
  }
})


