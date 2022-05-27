<template>
  <AntLayout>
    <AntSider>
      <Menu :items="asyncRoutes" />
    </AntSider>
    <AntLayout>
      <AntHeader>Header</AntHeader>
      <AntContent>Content</AntContent>
    </AntLayout>
    <Setting></Setting>
  </AntLayout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout as AntLayout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  import Menu from './menu/src/components/Menu.vue'
  import { asyncRoutes } from '@/router/routes'

  export default defineComponent({
    name: 'BasicLayout',
    components: { AntLayout, AntSider: AntLayout.Sider, AntHeader: AntLayout.Header, AntContent: AntLayout.Content, Setting, Menu },
    setup() {
      return {
        asyncRoutes
      }
    }
  })
</script>
