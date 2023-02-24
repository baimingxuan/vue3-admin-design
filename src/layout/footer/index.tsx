import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'

export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    return () => (
      <Layout.Footer>
        <div>Copyright &copy;2022 baimingxuan</div>
      </Layout.Footer>
    )
  }
})


