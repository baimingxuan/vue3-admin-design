<template>
  <div
    :class="[
      'compo_sider-trigger',
      { collapsed: getMenuFold }
    ]"
    @click.stop="toggledMenuFold"
  >
    <SvgIcon name="collapsed" :size="16" />
  </div>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  const { getMenuFold, toggledMenuFold } = useMenuSetting()
</script>

<style lang="less" scoped>
  .compo_sider-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;

    &:deep(svg) {
      color: #ffffffa6;
    }

    &.collapsed {

      &:deep(svg) {
        transform:scaleX(-1)
      }
    }

  }
</style>