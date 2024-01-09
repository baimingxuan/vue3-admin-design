import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from './hooks/web/useTitle'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'

export default defineComponent({
  name: 'App',

  setup() {
    useTitle()

    const { getThemeColor } = useBaseSetting()

    return () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: unref(getThemeColor)
          }
        }}
      >
        <RouterView />
      </ConfigProvider>
    )
  }
})
