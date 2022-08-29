<template>
  <MenuItems
    v-if="!menuHasChildren(item) && getShowMenu"
    :item="item"
    :collapsed="collapsed"
    :showTitle="showTitle"
  />
  <AntdSubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="`submenu-${item.path}`"
    :class="{ 'submenu-collapsed': collapsed && showTitle }"
  >
    <template #title>
      <MenuItemCont :item="item" :collapsed="collapsed" :showTitle="showTitle" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenuItem :item="childrenItem" />
    </template>
  </AntdSubMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'
  import type { AppMenu as MenuType } from '@/router/types'
  import { menuItemProps } from '../props'
  import MenuItems from './MenuItem.vue'
  import MenuItemCont from './MenuItemCont.vue'

  export default defineComponent({
    name: 'SubMenuItem',
    components: {
      MenuItems,
      MenuItemCont,
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

<style lang="less">
  .submenu-collapsed {
    
    .ant-menu-submenu-title {
      height: auto !important;
      line-height: initial !important;
      padding: 12px 0 !important;
      margin: 0;
      text-align: center !important;
      transition: all 0.3s ease;

      .compo_menu-item-cont {
        .svg-icon {
          margin-bottom: 6px;
        }

        &__name {
          display: block;
          line-height: initial;
          margin-left: 0;
        }
      } 
    }
  }
</style>
