<template>
  <div
    class="layout-setting-trigger"
    @click="toggleDrawer"
  >
    <AntdSettingOutlined />
  </div>
  <AntdDrawer
    :visible="drawerVisible"
    title="项目配置"
    width="320"
    placement="right"
    @close="toggleDrawer"
  >
    <p>Some contents...</p>
  </AntdDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  
  import { Drawer as AntdDrawer } from 'ant-design-vue'
  import { SettingOutlined as AntdSettingOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'LayoutSetting',
    components: { AntdDrawer, AntdSettingOutlined },
    setup() {
      const drawerVisible = ref<boolean>(false)

      const toggleDrawer = () => {
        drawerVisible.value = !unref(drawerVisible)
      }

      return {
        drawerVisible,
        toggleDrawer
      }
    }
  })
</script>

<style lang="less" scoped>
  .layout-setting-trigger {
    position: fixed;
    top: 240px;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    font-size: 18px;
    color: #fff;
    background-color: #1890ff;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
  }
</style>