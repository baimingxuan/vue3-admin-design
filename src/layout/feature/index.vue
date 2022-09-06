<template>
  <div class="layout_feature">
    <Search />
    <FullScreen />
    <LocalePicker />
    <DocLink />
    <GithubLink />
  </div>
</template>

<script lang="ts" setup>
  import {
    Search,
    FullScreen,
    LocalePicker,
    DocLink,
    GithubLink
  } from './components'
</script>

<style lang="less" scoped>
  .layout_feature {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 160px;
  }
</style>