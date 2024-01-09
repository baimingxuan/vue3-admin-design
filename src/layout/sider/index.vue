<template>
  <HybridSider v-if="getIsHybridMenu" />
  <BasicSider v-else />
</template>

<script lang="ts" setup>
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import BasicSider from './BasicSider.vue'
import HybridSider from './HybridSider/index.vue'

const { getIsHybridMenu } = useMenuSetting()
</script>
