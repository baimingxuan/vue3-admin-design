import { defineComponent, unref } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import SvgIcon from '@/components/SvgIcon'
import styles from './index.module.less'

export default defineComponent({
  name: 'SiderTrigger',
  setup() {
    const { getMenuFold, toggledMenuFold } = useMenuSetting()

    return () => (
      <div class={[styles['sider-trigger'], { [styles['collapsed']]: unref(getMenuFold) }]} onClick={toggledMenuFold}>
        <SvgIcon name='collapsed' size={16} />
      </div>
    )
  }
})
