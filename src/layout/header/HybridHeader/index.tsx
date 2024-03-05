import { defineComponent, computed, unref } from 'vue'
import { LayoutHeader } from 'ant-design-vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { ThemeEnum } from '@/enums/appEnum'
import { AppLogo } from '@/components/Application'
import LayoutMenu from '../../menu'
import LayoutTags from '../../tags'
import LayoutFeature from '../../feature'
import './index.less'

export default defineComponent({
  name: 'LayoutHybridHeader',
  setup() {
    const { getShowTags } = useHeaderSetting()
    const { getMenuTheme } = useMenuSetting()
    const { isDarkMode } = useDarkModeSetting()

    const getHeaderMode = computed(() => {
      return unref(isDarkMode) ? '' : unref(getMenuTheme)
    })

    const getCurrentMenuTheme = computed(() => {
      return unref(isDarkMode) ? ThemeEnum.LIGHT : unref(getMenuTheme)
    })

    return () => (
      <LayoutHeader class={['layout-hybrid-header', unref(getHeaderMode)]}>
        <div class='layout-hybrid-header-wrap'>
          <div class='logo-box'>
            <AppLogo theme='light' />
          </div>
          <div class='main-box'>
            <div class='main-box__cont'>
              <div class='main-box__cont-menu'>
                <LayoutMenu isHorizontal={true} menuTheme={unref(getCurrentMenuTheme)} />
              </div>
              <LayoutFeature />
            </div>
          </div>
        </div>
        {unref(getShowTags) && <LayoutTags />}
      </LayoutHeader>
    )
  }
})
