<template>
  <AntdSider
    ref="siderRef"
    breakpoint="lg"
    collapsible
  >
  </AntdSider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout  } from 'ant-design-vue'

  export default defineComponent({
    name: 'SimpleSider',
    components: { AntdSider: Layout.Sider }
  })
</script>