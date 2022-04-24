<template>
  <div class="layout-setting-btn">
    <SettingOutlined />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  
  import { SettingOutlined as AntdSettingOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'LayoutSetting',
    components: { AntdSettingOutlined }
  })
</script>

<style lang="less" scoped>
  .layout-setting-btn {
    position: absolute;
    top: 240px;
    right: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    background-color: #1890ff;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
  }
</style>