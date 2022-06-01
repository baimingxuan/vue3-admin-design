<template>
  <div @click.stop="toggleCollapsed">
    <DoubleRightOutlined v-if="getCollapsed" />
    <DoubleLeftOutlined v-else />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'SiderTrigger',
    components: { DoubleRightOutlined, DoubleLeftOutlined },

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