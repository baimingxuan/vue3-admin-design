<template>
  <div class="compo_menu-type-picker">
    <template v-for="item in typeList || []" :key="item.title">
      <AntdTooltip :title="item.title" placement="top">
        <div
          :class="[
            'menu-type-picker__item',
            `menu-type-picker__item--${item.type}`,
            {
              ['menu-type-picker__item--active'] : def === item.type
            }
          ]"
        ></div>
      </AntdTooltip>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { Tooltip as AntdTooltip } from 'ant-design-vue'
  export default defineComponent({
    name: 'MenuTypePicker',
    components: { AntdTooltip },
    props: {
      menuTypeList: {
        type: Array as PropType<any>,
        default: () => []
      },
      def: {
        type: String,
        default: '',
      }
    },
    setup() {
      const typeList = [
        {
          title: '左侧菜单',
          mode: 'inline',
          type: 'side-menu'
        },
        {
          title: '顶部菜单',
          mode: 'horizontal',
          type: 'top-menu'
        },
        {
          title: '混合菜单',
          mode: 'inline',
          type: 'mix-menu'
        }
      ]

      return {
        typeList
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
        padding: 12px;
        border: 2px solid #1890ff;

        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }
}
</style>
