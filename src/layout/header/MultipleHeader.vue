<template>
  <AntdHeader style="background: #fff">
    <LayoutTags />
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LayoutTags from '../tags/index.vue'
  import { Layout } from 'ant-design-vue'

  export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: { LayoutTags, AntdHeader: Layout.Header }
  })

</script>