<template>
  <div class="compo_menu-type-picker">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <Tooltip :title="item.title" placement="top">
        <div></div>
      </Tooltip>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  export default defineComponent({
    name: 'MenuTypePicker',
    props: {
      menuTypeList: {
        type: Array as PropType<any>,
        default: () => []
      },
      def: {
        type: String,
        default: '',
      }
    }
  })
</script>

<style lang="less" scoped>
.compo_menu-type-picker {
  display: flex;
}
</style>
