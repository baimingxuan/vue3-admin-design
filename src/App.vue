<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue'
</script>

<style lang="less">
@import "design/index.less";
</style>
