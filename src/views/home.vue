<template>
  <div class="home-wrap">{{ routeName }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRoute } from 'vue-router'

  export default defineComponent({
    name: 'Home',

    setup() {
      const routeName = useRoute().meta.title

      return { routeName }
    }
  })
</script>

<style lang="less" scoped>
  .home-wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
</style>