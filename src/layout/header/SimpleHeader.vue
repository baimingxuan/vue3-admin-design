<template>
  <AntdHeader style="background: #fff">
    <div class="">
      <LayoutTrigger :sider="false" />
    </div>
    <LayoutTags />
  </AntdHeader>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  import LayoutTrigger from '@/layout/trigger/index.vue'
  import LayoutTags from '../tags/index.vue'
  

  export default defineComponent({
    name: 'LayoutSimpleHeader',
    components: { AntdHeader: Layout.Header, LayoutTrigger, LayoutTags, }
  })

</script>

<style lang="less" scoped>

</style>