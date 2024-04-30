import { defineComponent, unref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { useTitle } from '@/hooks/web/useTitle'
import { setThemColor } from '@/logics/theme'

export default defineComponent({
  name: 'App',

  setup() {
    const { getThemeColor } = useBaseSetting()
    const { getModeAlgorithm } = useDarkModeSetting()

    watch(getThemeColor, () => {
      const htmlRoot = document.getElementById('htmlRoot')
      if (!htmlRoot) return

      setThemColor(htmlRoot)
    })

    useTitle()

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
