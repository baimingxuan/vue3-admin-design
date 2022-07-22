<template>
  <AntdMenuItem :key="item.path">
    <MenuItemContent :item="item" />
  </AntdMenuItem>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'

  import { menuItemProps } from '../../props'
  import MenuItemContent from './MenuItemContent.vue'

  export default defineComponent({
    name: 'MenuItem',
    components: {
      AntdMenuItem: AntdMenu.Item,
      MenuItemContent
    },
    props: menuItemProps
  })
</script>