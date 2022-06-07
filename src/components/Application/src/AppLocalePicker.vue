<template>
  <AntdDropdown
    placement="bottom"
  >
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
</script>