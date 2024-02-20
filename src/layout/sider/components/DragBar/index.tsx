import { defineComponent, computed, unref } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import styles from './index.module.less'

export default defineComponent({
  name: 'DragBar',

  setup() {
    const { getMenuFold, getMenuCanDrag, getSideBarMinWidth } = useMenuSetting()

    const getDragBarStyle = computed(() => {
      if (unref(getMenuFold)) {
        return { left: `${unref(getSideBarMinWidth)}px` }
      }
      return {}
    })

    return () => (
      <div
        class={[styles['drag-bar'], { [styles['drag-bar--hide']]: !unref(getMenuCanDrag) }]}
        style={unref(getDragBarStyle)}
      />
    )
  }
})
