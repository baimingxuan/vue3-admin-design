<template>
  <AntdTag class="compo_tag-item" :closable="!fixed" @close.prevent="handleClose">
    <span class="compo_tag-item__dot" />
    <span>{{ name }}</span>
  </AntdTag>
</template>

<script lang="ts" setup>
  import { propTypes } from '@/utils/propTypes'
  import { Tag as AntdTag } from 'ant-design-vue'

  defineProps({
    fixed: propTypes.bool,
    name: propTypes.string
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
    margin: 4px 2px;
    padding: 0 10px;
    border-radius: 3px;
    line-height: 32px;
    border: 1px solid #e8eaec;
    color: #555;
    background: #fff;
    overflow: hidden;
    cursor: pointer;

    &__dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 6px;
      border-radius: 50%;
      background: #e8eaec;
    }

    &.active &__dot{
      background: #409eff;
    }
  }

</style>