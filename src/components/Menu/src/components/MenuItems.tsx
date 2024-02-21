import { defineComponent } from 'vue'
import { MenuItem } from 'ant-design-vue'

import { menuItemProps } from '../props'
import MenuItemCont from './MenuItemCont'

export default defineComponent({
  name: 'MenuItems',
  props: menuItemProps,
  render() {
    const { item, collapsed, showTitle } = this
    return (
      <MenuItem key={item.path}>
        <MenuItemCont item={item} collapsed={collapsed} showTitle={showTitle} />
      </MenuItem>
    )
  }
})
