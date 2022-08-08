<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" :item="item" />
  <AntdSubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`submenu-${item.path}`"
  >
    <template #title>
      <BasicMenuItemCont :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem :item="childrenItem" />
    </template>
  </AntdSubMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'
  import type { AppMenu as MenuType } from '@/router/types'
  import { menuItemProps } from '../../props'
  import BasicMenuItem from './BasicMenuItem.vue'
  import BasicMenuItemCont from './BasicMenuItemCont.vue'

  export default defineComponent({
    name: 'BasicSubMenuItem',
    components: {
      BasicMenuItem,
      BasicMenuItemCont,
      AntdSubMenu: AntdMenu.SubMenu
    },
    props: menuItemProps,
    setup(props) {
      const getShowMenu = computed(() => !props.item.meta?.hideMenu)

      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          !menuTreeItem.meta?.hideChildrenInMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        )
      }

      return {
        getShowMenu,
        menuHasChildren
      }
    }
  })
</script>
