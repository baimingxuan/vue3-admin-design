import { defineComponent, computed, unref } from 'vue'
import { LayoutHeader } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { useLayoutMenu } from '@/layout/menu/useLayoutMenu'
import { useLayout } from '@/layout/useLayout'
import { ThemeEnum } from '@/enums/appEnum'
import { AppLogo } from '@/components/Application'
import LayoutMenu from '../../menu'
import LayoutTags from '../../tags'
import LayoutFeature from '../../feature'
import './index.less'

export default defineComponent({
  name: 'LayoutHybridHeader',
  setup() {
    const { getMenuTheme, getMenuSplit } = useMenuSetting()
    const { isDarkMode } = useDarkModeSetting()
    const { getShowTags, getHeaderHeight } = useLayout()

    const { menusRef } = useLayoutMenu(unref(getMenuSplit))

    const getHeaderMode = computed(() => {
      return unref(isDarkMode) ? '' : unref(getMenuTheme)
    })

    const getCurrentMenuTheme = computed(() => {
      return unref(isDarkMode) ? ThemeEnum.LIGHT : unref(getMenuTheme)
    })

    return () => (
      <LayoutHeader
        class={['layout-hybrid-header', unref(getHeaderMode), { 'has-border': unref(getMenuSplit) }]}
        style={{ height: unref(getHeaderHeight) }}
      >
        <div class='layout-hybrid-header-wrap'>
          <div class='logo-box'>
            <AppLogo theme='light' />
          </div>
          <div class='main-box'>
            <div class='main-box__cont'>
              <div class='main-box__cont-menu'>
                <LayoutMenu menus={unref(menusRef)} isHorizontal={true} menuTheme={unref(getCurrentMenuTheme)} />
              </div>
              <LayoutFeature />
            </div>
          </div>
        </div>
        {unref(getShowTags) && !unref(getMenuSplit) && <LayoutTags />}
      </LayoutHeader>
    )
  }
})
