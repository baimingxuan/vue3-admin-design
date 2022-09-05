<template>
  <AntdDropdown
    placement="bottom"
  >
    <SvgIcon name="locale" :size="20" />
    <span>切换语言</span>
    <template #overlay>
      <AntdMenu>
        <AntdMenuItem>简体中文</AntdMenuItem>
        <AntdMenuItem>繁體中文</AntdMenuItem>
        <AntdMenuItem>English</AntdMenuItem>
      </AntdMenu>
    </template>
  </AntdDropdown>
</template>

<script lang="ts" setup>
  import { Dropdown as AntdDropdown, Menu as AntdMenu, MenuItem as AntdMenuItem } from 'ant-design-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'
</script>