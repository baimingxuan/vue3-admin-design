<template>
  <Menu.Item :key="item.path">
    <MenuItemCont :item="item" :collapsed="collapsed" :showTitle="showTitle" />
  </Menu.Item>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu } from 'ant-design-vue'

  import { menuItemProps } from '../props'
  import MenuItemCont from './MenuItemCont.vue'

  export default defineComponent({
    name: 'MenuItem',
    components: {
      Menu,
      MenuItemCont
    },
    props: menuItemProps
  })
</script>