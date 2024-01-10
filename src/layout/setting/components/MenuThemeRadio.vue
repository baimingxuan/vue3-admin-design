<template>
  <div class="compo_menu-color-switch">
    <RadioGroup
      :value="getMenuTheme"
      button-style="solid"
      size="small"
      :disabled="isDarkMode"
      @change="handleChangeTheme"
    >
      <RadioButton value="dark">暗色</RadioButton>
      <RadioButton value="light">亮色</RadioButton>
    </RadioGroup>
  </div>
</template>

<script lang="ts" setup>
import { RadioGroup, RadioButton } from 'ant-design-vue'
import { ThemeEnum } from '@/enums/appEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'

const { getMenuTheme, changeMenuTheme } = useMenuSetting()
const { isDarkMode } = useDarkModeSetting()

function handleChangeTheme(e: any) {
  const theme = e.target.value as ThemeEnum
  changeMenuTheme(theme)
}
</script>

<style lang="less" scoped>
.compo_menu-color-switch {
  .ant-radio-group {
    display: flex;
    flex-direction: column;

    .ant-radio-button-wrapper {
      padding: 0 13px;
      border-left-width: 1px;

      &:first-child {
        border-radius: 4px 4px 0 0;
      }

      &:last-child {
        border-radius: 0 0 4px 4px;
      }

      &:not(:first-child)::before {
        display: none;
      }
    }
  }
}
</style>
