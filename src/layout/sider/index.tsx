import { defineComponent, unref } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import BasicSider from './BasicSider.vue'
import HybridSider from './HybridSider/index.vue'

export default defineComponent({
  name: 'LayoutSider',
  setup() {
    const { getIsHybridMenu } = useMenuSetting()
    return () => (unref(getIsHybridMenu) ? <HybridSider /> : <BasicSider />)
  }
})
