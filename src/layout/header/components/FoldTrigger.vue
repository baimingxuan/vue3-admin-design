<template>
  <span
    :class="[
      'compo_fold-trigger',
      theme,
      { unfold: !getMenuFold }
    ]"
    @click="toggledMenuFold"
  >
    <SvgIcon name="unfold" :size="20" />
  </span>
</template>

<script lang="ts" setup>
  import { propTypes } from '@/utils/propTypes'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import SvgIcon from '@/components/SvgIcon/index.vue'

  defineProps({
    theme: propTypes.oneOf(['light', 'dark'])
  })

  const { getMenuFold, toggledMenuFold } = useMenuSetting()

</script>

<style lang="less" scoped>
  .compo_fold-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;

    &.unfold {

      &:deep(svg) {
        transform:scaleX(-1)
      }
    }

  }
</style>