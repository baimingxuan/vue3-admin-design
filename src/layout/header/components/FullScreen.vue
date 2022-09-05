<template>
  <AntdTooltip
    :title="getTitle"
    placement='bottom'
    :mouseEnterDelay="0.5"
  >
    <SvgIcon
      v-if="!isFullscreen"
      name="screen-full"
      :size="20"
      @click="toggle"
    />
    <SvgIcon
      v-else
      name="screen-normal"
      :size="20"
      @click="toggle"
    />
  </AntdTooltip>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { useFullscreen } from '@vueuse/core'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  const { isFullscreen, toggle } = useFullscreen()

  const getTitle = computed(() => {
    return unref(isFullscreen) ? '退出全屏' : '全屏'
  })
</script>