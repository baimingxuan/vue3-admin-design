<template>
  <AntdTooltip :title="getTitle" placement='bottom' :mouseEnterDelay="0.5">
    <span @click="toggle">
      <ExpandOutlined v-if="!isFullscreen" />
      <CompressOutlined v-else />
    </span>
  </AntdTooltip>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { useFullscreen } from '@vueuse/core'
  import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue'

  const { isFullscreen, toggle } = useFullscreen()

  const getTitle = computed(() => {
    return unref(isFullscreen) ? '退出全屏' : '全屏'
  })
</script>