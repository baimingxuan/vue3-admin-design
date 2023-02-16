import type { CSSProperties } from 'vue'
import { defineComponent, unref, computed } from 'vue'
import { LayoutHeader as AntdHeader } from 'ant-design-vue'

import LayoutTags from '../tags/index.vue'
import LayoutFeature from '../feature'
import FoldTrigger from './components/FoldTrigger'
import Breadcrumb from './components/Breadcrumb'

import { MenuFoldBtnEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'

export default defineComponent({
  name: 'LayoutBasicHeader',
  setup() {
    const { getMenuFoldBtn } = useMenuSetting()
    const { getShowTags, getShowBreadCrumb } = useHeaderSetting()
    
    const getHeaderStyle = computed((): CSSProperties => ({
      flexDirection: 'column',
      height: 'auto',
      background: '#fff'
    }))
    const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.HEADER)

    return () => (
      <AntdHeader class='flex-between-h' style={unref(getHeaderStyle)}>
        <div class='flex-between-h' style='padding: 0 12px;'>
          <div class='flex-center-v'>
            { unref(getShowTrigger) && <FoldTrigger /> }
            { unref(getShowBreadCrumb) && <Breadcrumb /> }
          </div>
          <LayoutFeature />
        </div>
        { unref(getShowTags) && <LayoutTags /> }
      </AntdHeader>
    )
  }
})




