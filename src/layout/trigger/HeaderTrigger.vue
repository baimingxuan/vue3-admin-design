<template>
  <span :class="[theme]" @click="toggledMenuFold">
    <MenuUnfoldOutlined v-if="getMenuFold" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { propTypes } from '@/utils/propTypes'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
    },

    setup() {
      const { getMenuFold, toggledMenuFold } = useMenuSetting()

      return {
        getMenuFold,
        toggledMenuFold
      }
    }
  })
</script>