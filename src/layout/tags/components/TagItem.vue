<template>
  <AntdTag
    :class="['compo_tag-item', active]"
    :closable="!fixed"
    @close.prevent="handleClose"
  >
    <span class="compo_tag-item__dot" />
    <span class="compo_tag-item__name">{{ name }}</span>
  </AntdTag>
</template>

<script lang="ts" setup>
  import { propTypes } from '@/utils/propTypes'
  import { Tag as AntdTag } from 'ant-design-vue'

  defineProps({
    fixed: propTypes.bool,
    name: propTypes.string,
    active: propTypes.bool
  })

  const emit = defineEmits(['closeTag'])

  function handleClose() {
    emit('closeTag')
  }

</script>

<style lang="less" scoped>
  .compo_tag-item {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    margin: 0 2px;
    padding: 0 8px;
    border-radius: 3px;
    line-height: 30px;
    color: #555;
    background: #fff;
    overflow: hidden;
    cursor: pointer;

    &__dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
      border-radius: 50%;
      background: #e8eaec;
    }

    &__name {
      font-size: 12px;
    }

    &:deep(.anticon-close) {
      vertical-align: middle;
      svg {
        width: 8px;
        height: 8px;
      }
    }

    &.active &__dot{
      background: #409eff;
    }
  }

</style>