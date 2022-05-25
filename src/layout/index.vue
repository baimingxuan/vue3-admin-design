<template>
  <Layout>
    <Menu />
    <Setting></Setting>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { Layout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  import Menu from './menu/index.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: { Layout, Setting, Menu }
  })
</script>
