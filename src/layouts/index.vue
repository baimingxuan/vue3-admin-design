<template>
  <Layout></Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: { Layout }
  })
</script>