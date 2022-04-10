<template>
  <Sider
    collapsible>
  </Sider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  export default defineComponent({
    components: { Sider: Layout.Sider }
  })
</script>