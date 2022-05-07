<template>
  <MenuItem v-if="!menuHasChildren(item) && getShowMenu" />
  <AntdSubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`submenu-${item.path}`"
  >
    <template #title>
      <MenuItemContent :item="item" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenuItem :item="childrenItem" />
    </template>
  </AntdSubMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'
  import type { Menu as MenuType } from '@/router/types'
  import type { PropType } from 'vue'
  import MenuItem from './MenuItem.vue'
  import MenuItemContent from './MenuItemContent.vue'

  export default defineComponent({
    name: 'SubMenuItem',
    components: {
      MenuItem,
      MenuItemContent,
      AntdSubMenu: AntdMenu.SubMenu
    },
    props: {
      item: {
        type: Object as PropType<MenuType>,
        default: () => {}
      }
    },
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
