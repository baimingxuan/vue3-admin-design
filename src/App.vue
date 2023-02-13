<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from 'ant-design-vue'
  import { useTitle } from './hooks/web/useTitle'

  useTitle()
</script>

