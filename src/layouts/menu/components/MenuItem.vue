<template>
  <AntdMenuItem :key="item.path"></AntdMenuItem>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Menu as AntdMenu } from 'ant-design-vue'

  export default defineComponent({
    name: 'MenuItem',
    components: { AntdMenuItem: AntdMenu.Item },
    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  })
</script>