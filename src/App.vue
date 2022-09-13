<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue'
</script>

<style lang="less">
@import "./styles/index.less";
</style>
