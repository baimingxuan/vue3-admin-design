<template>
  <Tag class="tag-item-wrapper" :closable="!fixed" @close.prevent.stop="$emit('on-close')">
    <span class="tag-item-dot" />
    <slot />
  </Tag>
</template>

<script lang="ts" setup>
  import { ElTag as Tag } from 'element-plus'

  const props = defineProps({
    fixed: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="less">
.tag-item-wrapper {
  display: inline-block;
  vertical-align: middle;
  height: 32px!important;
  margin: 4px 2px!important;
  padding: 0 10px!important;
  border-radius: 3px!important;
  line-height: 32px!important;
  border: 1px solid #e8eaec!important;
  color: #555!important;
  background: #fff!important;
  overflow: hidden;
  cursor: pointer;
  .tag-item-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    background: #e8eaec;
  }
  &.active {
    .tag-item-dot {
      background: #409eff;
    }
  }
}
</style>
