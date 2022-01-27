<template>
  <div class="logo">
    <a href="/">
      <img src="../../../assets/images/logo.png" alt="logo">
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Logo'
  })
</script>

<style lang="less">
.logo {
  width: 260px;
  height: 84px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>