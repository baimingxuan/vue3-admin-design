<template>
  <AntdHeader></AntdHeader>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Layout } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: { AntdHeader: Layout.Header }
  })
</script>