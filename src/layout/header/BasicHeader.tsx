import type { CSSProperties } from 'vue'
import { defineComponent, unref, computed } from 'vue'
import { LayoutHeader, Space } from 'ant-design-vue'
import LayoutTags from '../tags'
import LayoutFeature from '../feature'
import FoldTrigger from './components/FoldTrigger'
import LayoutBreadcrumb from './components/Breadcrumb'
import { MenuFoldBtnEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'

export default defineComponent({
  name: 'LayoutBasicHeader',
  setup() {
    const { getMenuFoldBtn } = useMenuSetting()
    const { getShowTags, getShowBreadCrumb } = useHeaderSetting()
    const { isDarkMode, getAppMode } = useDarkModeSetting()

    const getHeaderStyle = computed(
      (): CSSProperties => ({
        flexDirection: 'column',
        height: 'auto',
        background: unref(isDarkMode) ? '#141414' : '#fff'
      })
    )
    const getHeaderCls = computed(() => {
      const mode = unref(getAppMode)
      return ['flex-between-h', mode]
    })
    const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.HEADER)

    return () => (
      <LayoutHeader class={unref(getHeaderCls)} style={unref(getHeaderStyle)}>
        <div class='flex-between-h' style='padding: 0 12px;'>
          <div class='flex-center-v'>
            <Space>
              {unref(getShowTrigger) && <FoldTrigger />}
              {unref(getShowBreadCrumb) && <LayoutBreadcrumb />}
            </Space>
          </div>
          <LayoutFeature />
        </div>
        {unref(getShowTags) && <LayoutTags />}
      </LayoutHeader>
    )
  }
})
