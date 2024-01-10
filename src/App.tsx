import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useDarkMode } from '@/hooks/setting/useDarkMode'
import { useTitle } from '@/hooks/web/useTitle'

export default defineComponent({
  name: 'App',

  setup() {
    useTitle()

    const { getThemeColor } = useBaseSetting()
    const { getModeAlgorithm } = useDarkMode()

    return () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: unref(getThemeColor)
          },
          algorithm: unref(getModeAlgorithm)
        }}
      >
        <RouterView />
      </ConfigProvider>
    )
  }
})
