<template>
  <div>
    <template v-if="!menuHasChildren(menuItem) && getShowMenu">
      <LinkItem toPath="">
        <MenuItem>
          <MenuItemContent
              :icon="menuItem.meta?.icon"
              :title="menuItem.meta?.title"
          />
        </MenuItem>
      </LinkItem>
    </template>

    <SubMenu
        v-if="menuHasChildren(menuItem) && getShowMenu"
        ref="subMenu"
        :index="resolvePath(menuItem.path)"
        popper-append-to-body
    >
      <template #title>
        <MenuItemContent
            :icon="menuItem.meta?.icon"
            :title="menuItem.meta?.title"
        />
      </template>
      <MenuContent
          v-for="child in menuItem.children"
          :key="child.path"
          :menuItem="child"
          :basePath="resolvePath(child.path)"
      />
    </SubMenu>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { Menu as MenuType } from '@/router/types'
  import { defineComponent, computed } from 'vue'
  import { Menu } from '@/router/types'
  import { ElMenuItem as MenuItem, ElSubMenu as SubMenu } from 'element-plus'
  import LinkItem from './LinkItem.vue'
  import MenuItemContent from './MenuItemContent.vue'
  import { resolve } from 'path-browserify'

  export default defineComponent({
    name: 'MenuContent',
    props: {
      menuItem: {
        required: true,
        type: Object as PropType<Menu>,
        default: () => {}
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    components: {
      MenuItem,
      SubMenu,
      LinkItem,
      MenuItemContent
    },
    mounted() {
      console.log('menuItem', this.menuItem)
    },
    setup(props) {
      const getShowMenu = computed(() => !props.menuItem.meta?.hideMenu)
      /**
       * determining external link or route
       * @param path
       */
      function isExternal(path: string): boolean {
        return /^(https?:|mailto:|tel:)/.test(path)
      }

      function resolvePath(routePath: string): string {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(props.basePath)) {
          return props.basePath
        }
        return resolve(props.basePath, routePath)
      }

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
        resolvePath,
        menuHasChildren
      }
    }
  })
</script>
