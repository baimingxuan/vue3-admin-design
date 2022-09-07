<template>
  <AntdTooltip
    title="文档"
    placement='bottom'
    :mouseEnterDelay="0.5"
  >
    <span class="icon-btn">
      <SvgIcon name="document" :size="20" />
    </span>
  </AntdTooltip>
</template>

<script lang="ts" setup>
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'
</script>