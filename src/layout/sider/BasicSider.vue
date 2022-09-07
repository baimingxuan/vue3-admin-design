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
      <SiderTrigger />
    </template>
    <LayoutMenu />
    <DragBar ref="dragBarRef" />
  </AntdSider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'
  import SiderTrigger from './components/SiderTrigger.vue'
  import DragBar from './components/DragBar.vue'
  import LayoutMenu from '@/layout/menu/index.vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'SimpleSider',
    components: { AntdSider: Layout.Sider, SiderTrigger, DragBar, LayoutMenu },

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