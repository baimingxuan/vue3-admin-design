<template>
  <AntdSider
    ref="siderRef"
    breakpoint="lg"
    collapsible
    :theme="getMenuTheme"
    :width="getMenuWidth"
    :collapsed="getMenuFold"
  >
    <template #trigger>
      <LayoutTrigger />
    </template>
    <LayoutMenu />
  </AntdSider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'
  import LayoutTrigger from '@/layout/trigger/index.vue'
  import DragBar from './components/DragBar.vue'
  import LayoutMenu from '@/layout/menu/index.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'HybridSider',
    components: { AntdSider: Layout.Sider, LayoutTrigger, DragBar, LayoutMenu },

    setup() {
      const { getMenuTheme, getMenuWidth, getMenuFold } = useMenuSetting()

      return {
        getMenuTheme,
        getMenuWidth,
        getMenuFold
      }
    }
  })
</script>