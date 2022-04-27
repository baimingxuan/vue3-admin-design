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

  import { ColorItem } from '../enum' 

  export default defineComponent({
    name: 'ThemeColorPicker',
    components: { AntdTooltip, AntdCheckOutlined },
    props: {
      colorList: {
        type: Array as PropType<ColorItem[]>,
        default: []
      },
      def: {
        type: String,
        default: '#1890ff'
      }
    }
  })
</script>

<style lang="less">
  .compo_theme-color-picker {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    margin: 16px 0;

    .theme-color-picker__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {

        svg {
          display: inline-block;
          margin-bottom: 6px;
          margin-left: 4px;
          font-size: 12px;
          fill: #fff !important;
        }
      }
    }
  }
</style>
