<template>
  <Layout>
    <Menu :items="asyncRoutes" />
    <Setting></Setting>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { Layout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  import Menu from './menu/src/components/Menu.vue'
  import { asyncRoutes } from '@/router/routes'

  export default defineComponent({
    name: 'BasicLayout',
    components: { Layout, Setting, Menu },
    setup() {
      return {
        asyncRoutes
      }
    }
  })
</script>
