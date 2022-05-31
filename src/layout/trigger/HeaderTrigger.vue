<template>
  <span :class="[theme]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" />
    <MenuFoldOutlined v-else />
  </span>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { propTypes } from '@/utils/propTypes'

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { MenuUnfoldOutlined, MenuFoldOutlined },
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
    },

    setup() {
      const getCollapsed = ref(false)

      function toggleCollapsed() {
        getCollapsed.value = !getCollapsed.value
      }
      return {
        getCollapsed,
        toggleCollapsed
      }
    }
  })
</script>