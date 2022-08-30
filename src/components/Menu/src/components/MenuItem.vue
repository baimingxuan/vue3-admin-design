<template>
  <AntdMenuItem :key="item.path">
    <MenuItemCont :item="item" :collapsed="collapsed" :showTitle="showTitle" />
  </AntdMenuItem>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'

  import { menuItemProps } from '../props'
  import MenuItemCont from './MenuItemCont.vue'

  export default defineComponent({
    name: 'MenuItem',
    components: {
      AntdMenuItem: AntdMenu.Item,
      MenuItemCont
    },
    props: menuItemProps
  })
</script>