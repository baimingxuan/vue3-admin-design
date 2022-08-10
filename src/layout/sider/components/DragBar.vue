<template>
  <div class="compo_drag-bar" :class="getDragBarClass" :style="getDragBarStyle" />
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'DragBar',

    setup() {
      const { getMenuFold, getMenuCanDrag, getSideBarMinWidth } = useMenuSetting()

      const getDragBarStyle = computed(() => {
        if (unref(getMenuFold)) {
          return { left: `${unref(getSideBarMinWidth)}px` }
        }
        return {}
      })

      const getDragBarClass = computed(() => {
        return [
          {
            ['compo_drag-bar--hide']: !unref(getMenuCanDrag)
          }
        ]
      })

      return {
        getDragBarStyle,
        getDragBarClass
      }
    }
  })
</script>

<style lang="less" scoped>
  .compo_drag-bar {
    position: absolute;
    top: 0;
    right: -2px;
    z-index: 200;
    width: 2px;
    height: 100%;
    cursor: col-resize;
    border-top: none;
    border-bottom: none;

    &--hide {
      display: none;
    }

    &:hover {
      background-color: #108ee9;
      box-shadow: 0 0 4px 0 rgb(28 36 56 / 15%);
    }
  }
</style>