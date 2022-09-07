<template>
  <AntdDropdown
    placement="bottom"
  >
    <span class="icon-btn">
      <SvgIcon name="locale" :size="20" />
    </span>
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