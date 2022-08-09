<template>
  <span class="compo_menu-item-cont">
    <SvgIcon v-if="getIcon" :name="getIcon" :size="16" />
    <span class="compo_menu-item-cont__name">{{ getIconName }}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { menuItemContentProps } from '../../props'

  import SvgIcon from '@/components/SvgIcon/index.vue'

  export default defineComponent({
    name: 'BasicMenuItemCont',
    components: { SvgIcon },
    props: menuItemContentProps,

    setup(props) {
      const getIcon = computed(() => props.item.meta?.icon as string)
      const getIconName = computed(() => props.item?.name)

      return {
        getIcon,
        getIconName
      }
    }
  })
</script>

<style lang="less">
  .compo_menu-item-cont {
    &__name {
      margin-left: 8px;
    }
  }
</style>