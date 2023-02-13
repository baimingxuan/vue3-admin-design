import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from './hooks/web/useTitle'

export default defineComponent({
  name: 'App',

  setup() {
    useTitle()

    return () => (
      <ConfigProvider>
        <RouterView />
      </ConfigProvider>
    )
  }
})
  


