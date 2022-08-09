<template>
  <AntLayout>
    <AntSider v-model:collapsed="menuCollapsed" collapsible>
      <LayoutMenu />
    </AntSider>
    <AntLayout>
      <AntHeader>Header</AntHeader>
      <AntContent>
        <LayoutPage />
      </AntContent>
    </AntLayout>
    <Setting></Setting>
  </AntLayout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Layout as AntLayout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  import LayoutMenu from './menu/index.vue'
  import LayoutPage from './content/components/Page.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      AntLayout,
      AntSider: AntLayout.Sider,
      AntHeader: AntLayout.Header,
      AntContent: AntLayout.Content,
      Setting,
      LayoutMenu,
      LayoutPage
    },
    setup() {
      const menuCollapsed = ref<boolean>(false)
      return {
        menuCollapsed
      }
    }
  })
</script>
