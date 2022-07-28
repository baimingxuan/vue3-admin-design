<template>
  <AntdMenuItem :key="item.path">
    <BasicMenuItemCont :item="item" />
  </AntdMenuItem>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'

  import { menuItemProps } from '../../props'
  import BasicMenuItemCont from './BasicMenuItemCont.vue'

  export default defineComponent({
    name: 'BasicMenuItem',
    components: {
      AntdMenuItem: AntdMenu.Item,
      BasicMenuItemCont
    },
    props: menuItemProps
  })
</script>