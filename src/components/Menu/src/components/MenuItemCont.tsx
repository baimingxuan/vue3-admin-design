import type { CSSProperties } from 'vue'
import { defineComponent, computed, unref } from 'vue'
import { menuItemContentProps } from '../props'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'MenuItemCont',
  components: { SvgIcon },
  props: menuItemContentProps,
  setup(props) {
    const getIcon = computed(() => props.item?.icon as string)
    const getIconName = computed(() => props.item?.name)
    const getHideName = computed(() => props.collapsed && !props.showTitle)
    const getContStyle = computed(
      (): CSSProperties => ({
        marginLeft: '8px',
        transition: 'all 0.3s ease'
      })
    )

    return () => (
      <span class='menu-item-cont'>
        {unref(getIcon) ? <SvgIcon name={unref(getIcon)} size={props.collapsed ? 20 : 16} /> : <></>}
        <span class={['menu-item-cont__name', { hide: unref(getHideName) }]} style={unref(getContStyle)}>
          {unref(getIconName)}
        </span>
      </span>
    )
  }
})
