import { defineComponent, unref } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import BasicSider from './BasicSider'
import HybridSider from './HybridSider'

export default defineComponent({
  name: 'LayoutSider',
  setup() {
    const { getIsHybridMenu } = useMenuSetting()

    return () => (unref(getIsHybridMenu) ? <HybridSider /> : <BasicSider />)
  }
})
