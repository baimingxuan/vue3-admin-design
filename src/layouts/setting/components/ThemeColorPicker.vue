<template>
  <div class="compo_theme-color-picker">
    <template v-for="color in colorList || []" :key="color">
      <span
        :class="['theme-color-picker__item', { 'theme-color-picker__item--active': def === color }]"
        :style="{ background: color }"
      >
        <CheckOutlined />
      </span>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { CheckOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { CheckOutlined },
    props: {
      colorList: {
        type: Array as PropType<any>,
        default: []
      },
      def: {
        type: String,
        default: ''
      }
    }
  })
</script>

<style lang="less" scoped>
  .compo_theme-color-picker {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    margin: 16px 0;

    .theme-color-picker__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      &--active {
        border: 1px solid lighten(@primary-color, 10%);
      }
    }
  }
</style>
