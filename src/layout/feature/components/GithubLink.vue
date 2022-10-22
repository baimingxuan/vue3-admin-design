<template>
  <AntdTooltip
    title="github"
    placement='bottom'
    :mouseEnterDelay="0.5"
  >
    <span class="icon-btn">
      <SvgIcon name="github" :size="20" @click="openGithub" />
    </span>
  </AntdTooltip>
</template>

<script lang="ts" setup>
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'
  import { openWindow } from '@/utils'
  import { GITHUB_URL } from '@/settings/websiteSetting'

  function openGithub() {
    openWindow(GITHUB_URL)
  }
</script>