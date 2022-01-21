<template>
  <div v-if="!menuItem.hidden">
    <template></template>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, toRefs, reactive } from 'vue'
  import { Menu } from '@/router/types'
  import { ElMenuItem as MenuItem, ElSubMenu as SubMenu, ElMenuItemGroup as MenuItemGroup } from'element-plus'
  import { LinkItem } from './LinkItem.vue'

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
      MenuItemGroup,
      LinkItem
    },
    setup() {}
  })
</script>
