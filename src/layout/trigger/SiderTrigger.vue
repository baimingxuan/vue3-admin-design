<template>
  <div @click.stop="toggledMenuFold">
    <DoubleRightOutlined v-if="getMenuFold" />
    <DoubleLeftOutlined v-else />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  export default defineComponent({
    name: 'SiderTrigger',
    components: { DoubleRightOutlined, DoubleLeftOutlined },

    setup() {
      const { getMenuFold, toggledMenuFold } = useMenuSetting()

      return {
        getMenuFold,
        toggledMenuFold
      }
    }
  })
</script>