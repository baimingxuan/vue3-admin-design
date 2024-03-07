import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { useTitle } from '@/hooks/web/useTitle'

export default defineComponent({
  name: 'App',

  setup() {
    useTitle()

    const { getThemeColor } = useBaseSetting()
    const { getModeAlgorithm } = useDarkModeSetting()

    return () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: unref(getThemeColor),
            borderRadius: 4
          },
          algorithm: unref(getModeAlgorithm)
        }}
      >
        <RouterView />
      </ConfigProvider>
    )
  }
})
