<template>
  <div
    class="compo_app-mode-switch"
    :class="{ 'compo_app-mode-switch--dark': isDarkMode }"
    @click="switchAppMode"
  >
    <div class="app-mode-switch__inner" />
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AppModeEnum } from '@/enums/appEnum'
  import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
  import { updateDarkTheme } from '@/logics/theme/mode'

  import SvgIcon from '@/components/SvgIcon/index.vue'

  const { setAppMode, getAppMode } = useBaseSetting()

  const isDarkMode = computed(() => getAppMode.value === AppModeEnum.DARK)

  function switchAppMode() {
    const mode = getAppMode.value === AppModeEnum.DARK ? AppModeEnum.LIGHT : AppModeEnum.DARK
    setAppMode(mode)
    updateDarkTheme(mode)
  }
  
</script>

<style lang="less" scoped>
  .compo_app-mode-switch {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    margin-left: auto;
    border-radius: 30px;
    background-color: #151515;
    cursor: pointer;

    .app-mode-switch__inner {
      position: absolute;
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