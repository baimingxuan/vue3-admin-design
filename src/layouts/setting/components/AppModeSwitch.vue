<template>
  <div class="compo_app-mode-switch" :class="{ 'compo_app-mode-switch--dark': isDark }" @click="toggleDarkMode">
    <div class="app-mode-switch__inner" />
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, unref } from 'vue'

  import SvgIcon from '@/components/SvgIcon/index.vue'

  const isDark = ref<boolean>(false)

  function toggleDarkMode() {
    return !unref(isDark)
  }
</script>

<style lang="less" scoped>
  .compo_app-mode-switch {
    position: relative;
    display: flex;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;
    background-color: #151515;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    .app-mode-switch-inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
    }

    &--dark {
      .app-mode-switch__inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>