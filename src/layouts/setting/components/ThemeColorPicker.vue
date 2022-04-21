<template>
  <div class="compo_theme-color-picker">
    <template v-for="color in colorList || []" :key="color"></template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  export default defineComponent({
    name: 'ThemeColorPicker',
    props: {
      colorList: {
        type: Array as PropType<any>,
        default: []
      }
    }
  })
</script>

<style lang="less" scoped>

</style>
