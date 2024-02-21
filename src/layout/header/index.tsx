import { defineComponent, computed, unref } from 'vue'
import { LayoutHeader } from 'ant-design-vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import { AppLogo } from '@/components/Application'
import LayoutMenu from '../menu'
import LayoutTags from '../tags'
import LayoutFeature from '../feature'
import styles from './index.module.less'

export default defineComponent({
  name: 'LayoutHeaders',
  setup() {
    const { getShowTags } = useHeaderSetting()
    const { getMenuTheme } = useMenuSetting()
    const { isDarkMode, getAppMode } = useDarkModeSetting()

    const getHeaderMode = computed(() => {
      return unref(isDarkMode) ? unref(getAppMode) : unref(getMenuTheme)
    })

    return () => (
      <LayoutHeader class={[styles['layout-headers'], styles[unref(getHeaderMode)]]}>
        <div class={styles['layout-headers-wrap']}>
          <div class={styles['logo-box']}>
            <AppLogo theme='light' />
          </div>
          <div class={styles['main-box']}>
            <div class={styles['main-box__cont']}>
              <div class={styles['main-box__cont-menu']}>
                <LayoutMenu isHorizontal={true} />
              </div>
              <LayoutFeature />
            </div>
          </div>
        </div>
        {unref(getShowTags) ? <LayoutTags /> : <></>}
      </LayoutHeader>
    )
  }
})
