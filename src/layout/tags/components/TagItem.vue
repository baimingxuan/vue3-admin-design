<template>
  <Tag
    :class="['compo_tag-item', { active }]"
    :closable="!fixed"
    @close="handleClose"
  >
    <span class="compo_tag-item__dot" />
    <span class="compo_tag-item__name">{{ name }}</span>
  </Tag>
</template>

<script lang="ts" setup>
  import { propTypes } from '@/utils/propTypes'
  import { Tag } from 'ant-design-vue'

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
    vertical-align: top;
    height: 24px;
    margin: 0 2px;
    padding: 0 8px;
    border-radius: 3px;
    line-height: 24px;
    color: #555;
    background: @white;
    overflow: hidden;
    cursor: pointer;

    &__dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 6px;
      border-radius: 50%;
      background: #dcdee0;
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

    &.active {
      border: none;
      color: @white;
      background: @primary-color;
      & .compo_tag-item__dot{
        background: @white;
      }
      &:deep(.anticon-close) {
        color: @white;
      }
    }
  }

</style>