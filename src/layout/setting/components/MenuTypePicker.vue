<template>
  <div class="compo_menu-type-picker">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <AntdTooltip :title="item.title" placement="top">
        <div
          :class="[
            'menu-type-picker__item',
            `menu-type-picker__item--${item.type}`,
            {
              ['menu-type-picker__item--active'] : def === item.type
            }
          ]"
          @click="handler(item)"
        >
          <AntdCheckOutlined />
        </div>
      </AntdTooltip>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { CheckOutlined as AntdCheckOutlined } from '@ant-design/icons-vue'
  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  import { menuTypeList } from '../enum'

  export default defineComponent({
    name: 'MenuTypePicker',
    components: { AntdTooltip, AntdCheckOutlined },
    props: {
      menuTypeList: {
        type: Array as PropType<typeof menuTypeList>,
        default: () => []
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({}),
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

  .menu-type-picker__item {
      position: relative;
      width: 56px;
      height: 48px;
      margin-right: 16px;
      overflow: hidden;
      cursor: pointer;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

      &:deep(svg) {
        display: none;
        z-index: 9;
        position: absolute;
        top: 20px;
        left: 22px;
      }

      &::before,
      &::after {
        position: absolute;
        content: '';
      }

      &--side-menu{
        &::before {
          top: 0;
          left: 0;
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--mix-menu {
        &::before {
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--top-menu {
        &::after {
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--dark {
        background-color: #273352;
      }


      &:hover,
      &--active {
        &:deep(svg) {
          display: block;
        }

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }
}
</style>
