<template>
  <MenuItems
    v-if="!menuHasChildren(item) && getShowMenu"
    :item="item"
    :collapsed="collapsed"
    :showTitle="showTitle"
  />
  <Menu.SubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :key="item.path"
    :class="{ 'submenu-collapsed': collapsed && showTitle }"
  >
    <template #title>
      <MenuItemCont :item="item" :collapsed="collapsed" :showTitle="showTitle" />
    </template>

    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <SubMenuItem :item="childrenItem" />
    </template>
  </Menu.SubMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Menu } from 'ant-design-vue'
  import type { AppMenu as MenuType } from '@/router/types'
  import { menuItemProps } from '../props'
  import MenuItems from './MenuItem.vue'
  import MenuItemCont from './MenuItemCont.vue'

  export default defineComponent({
    name: 'SubMenuItem',
    components: {
      MenuItems,
      MenuItemCont,
      Menu
    },
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

      return {
        getShowMenu,
        menuHasChildren
      }
    }
  })
</script>

<style lang="less">
  .submenu-collapsed {
    padding-bottom: 0 !important;
    
    .ant-menu-submenu-title {
      height: auto !important;
      line-height: initial !important;
      padding: 12px 0 !important;
      margin: 0;
      text-align: center !important;
      transition: all 0.2s ease;

      .compo_menu-item-cont {
        display: block;

        .svg-icon {
          vertical-align: 0;
          margin-bottom: 6px;
          transition: all 0.2s;
        }

        &__name {
          display: block;
          height: 22px;
          line-height: 22px;
          margin-left: 0;
          transition: all 0.2s;
        }
      } 
    }
  }
</style>
