<template>
  <MenuItem :key="item.path">
    <MenuItemCont :item="item" :collapsed="collapsed" :showTitle="showTitle" />
  </MenuItem>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuItem } from 'ant-design-vue'

  import { menuItemProps } from '../props'
  import MenuItemCont from './MenuItemCont.vue'

  export default defineComponent({
    name: 'MenuItems',
    components: {
      MenuItem,
      MenuItemCont
    },
    props: menuItemProps
  })
</script>