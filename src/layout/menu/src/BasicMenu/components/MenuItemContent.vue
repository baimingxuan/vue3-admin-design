<template>
  <span>
    <SvgIcon v-if="getIcon" :name="getIcon" :size="18" />
    {{ getIconName }}
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { menuItemContentProps } from '../../props'

  import SvgIcon from '@/components/SvgIcon/index.vue'

  export default defineComponent({
    name: 'MenuItemContent',
    components: { SvgIcon },
    props: menuItemContentProps,

    setup(props) {
      const getIcon = computed(() => props.item?.icon)
      const getIconName = computed(() => props.item?.name)

      return {
        getIcon,
        getIconName
      }
    }
  })
</script>