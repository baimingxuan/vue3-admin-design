<template>
  <Layout>
    <Setting></Setting>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'
  import Setting from './setting/index.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: { Layout, Setting }
  })
</script>