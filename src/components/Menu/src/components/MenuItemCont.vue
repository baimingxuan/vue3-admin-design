<template>
  <span :class="prefixCls">
    <SvgIcon
      v-if="getIcon"
      :name="getIcon"
      :size="collapsed ? 20 : 16"
    />
    <span
      :class="[
        `${prefixCls}__name`,
        { hide: getHideName }
      ]"
    >{{ getIconName }}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { menuItemContentProps } from '../props'

  import SvgIcon from '@/components/SvgIcon'

  export default defineComponent({
    name: 'MenuItemCont',
    components: { SvgIcon },
    props: menuItemContentProps,

    setup(props) {
      const prefixCls = 'compo_menu-item-cont'

      const getIcon = computed(() => props.item?.icon as string)
      const getIconName = computed(() => props.item?.name)
      const getHideName = computed(() => props.collapsed && !props.showTitle)

      return {
        prefixCls,
        getIcon,
        getIconName,
        getHideName
      }
    }
  })
</script>

<style lang="less">
  .compo_menu-item-cont {

    &__name {
      margin-left: 8px;
      transition: all 0.3s ease;
      
      &.hide {
        display: none;
      }
    }
  }
</style>