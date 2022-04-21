<template>
  <div class="compo_theme-color-picker">
    <template v-for="item in colorList || []" :key="item.color">
      <AntdTooltip :title="item.name" placement="top">
        <span
          :class="['theme-color-picker__item', { 'theme-color-picker__item--active': def === item.color }]"
          :style="{ background: item.color }"
        >
          <AntdCheckOutlined />
        </span>
      </AntdTooltip>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { CheckOutlined as AntdCheckOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { AntdTooltip, AntdCheckOutlined },
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
