<template>
  <AntdTooltip
    title="github"
    placement='bottom'
    :mouseEnterDelay="0.5"
  >
    <SvgIcon
      name="github"
      :size="20"
    />
  </AntdTooltip>
</template>

<script lang="ts" setup>
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'
</script>