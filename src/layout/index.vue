<template>
  <AntLayout>
    <!-- <BasicSider /> -->
    <HybridSider />
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
  import { defineComponent } from 'vue'
  import { Layout as AntLayout } from 'ant-design-vue'
  import Setting from './setting/index.vue'
  // import BasicSider from './sider/BasicSider.vue'
  import HybridSider from './sider/HybridSider/index.vue'
  import LayoutPage from './content/components/Page.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      AntLayout,
      AntSider: AntLayout.Sider,
      AntHeader: AntLayout.Header,
      AntContent: AntLayout.Content,
      Setting,
      // BasicSider,
      HybridSider,
      LayoutPage
    }
  })
</script>
