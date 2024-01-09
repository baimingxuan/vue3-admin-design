import { defineComponent, unref, computed } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider, theme } from 'ant-design-vue'
import { useTitle } from './hooks/web/useTitle'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { ThemeEnum } from '@/enums/appEnum'

export default defineComponent({
  name: 'App',

  setup() {
    useTitle()

    const { getThemeColor, getAppMode } = useBaseSetting()

    const isDarkMode = computed(() => unref(getAppMode) === ThemeEnum.DARK)

    return () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: unref(getThemeColor)
          },
          algorithm: theme.darkAlgorithm
        }}
      >
        <RouterView />
      </ConfigProvider>
    )
  }
})
