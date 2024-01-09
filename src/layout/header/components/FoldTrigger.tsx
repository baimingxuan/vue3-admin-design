import { defineComponent, unref } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import SvgIcon from '@/components/SvgIcon'
import compoStyle from './compo.module.less'

export default defineComponent({
  name: 'FoldTrigger',
  setup() {
    const { getMenuFold, toggledMenuFold } = useMenuSetting()

    return () => (
      <span
        class={[compoStyle['compo_fold-trigger'], !unref(getMenuFold) && compoStyle['unfold']]}
        onClick={toggledMenuFold}
      >
        <SvgIcon name='unfold' size={20} />
      </span>
    )
  }
})
