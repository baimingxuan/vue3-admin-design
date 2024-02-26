import { defineComponent, computed, unref } from 'vue'
import { SubMenu } from 'ant-design-vue'
import type { AppMenu as MenuType } from '@/router/types'
import { menuItemProps } from '../props'
import MenuItems from './MenuItems'
import MenuItemCont from './MenuItemCont'
import SubMenuItem from './SubMenuItem'

export default defineComponent({
  name: 'SubMenuItem',
  props: menuItemProps,
  setup(props) {
    const getShowMenu = computed(() => !props.item?.hideMenu)

    function menuHasChildren(menuTreeItem: MenuType): boolean {
      return (
        !menuTreeItem?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      )
    }

    return () => (
      <>
        {!menuHasChildren(props.item) && unref(getShowMenu) ? (
          <MenuItems
            item={props.item}
            collapsed={props.collapsed}
            showTitle={props.showTitle}
            class={{ 'menu-item-collapsed': props.collapsed && props.showTitle }}
          />
        ) : (
          <></>
        )}
        {menuHasChildren(props.item) && unref(getShowMenu) ? (
          <SubMenu key={props.item.path} class={{ 'submenu-collapsed': props.collapsed && props.showTitle }}>
            {{
              title: () => <MenuItemCont item={props.item} collapsed={props.collapsed} showTitle={props.showTitle} />,
              default: () => {
                return props.item.children?.map((cItem: MenuType) => {
                  return <SubMenuItem item={cItem} key={cItem.path} />
                })
              }
            }}
          </SubMenu>
        ) : (
          <></>
        )}
      </>
    )
  }
})
