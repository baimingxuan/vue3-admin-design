<template>
  <div :class="prefixCls">
    <Search v-if="getShowSearch" :class="`${prefixCls}-item`" />
    <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-item`" />
    <LocalePicker v-if="getShowLocale" :class="`${prefixCls}-item`" />
    <DocLink v-if="getShowDoc" :class="`${prefixCls}-item`" />
    <GithubLink v-if="getShowGithub" />
    <AntdDivider type="vertical" :class="`${prefixCls}-divider`" />
    <UserDropdown />
  </div>
</template>

<script lang="ts" setup>
  import {
    Search,
    FullScreen,
    LocalePicker,
    DocLink,
    GithubLink,
    UserDropdown
  } from './components'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  import { Divider as AntdDivider } from 'ant-design-vue'

  const prefixCls = 'layout_feature'
  const { getShowSearch, getShowFullScreen, getShowLocale, getShowDoc, getShowGithub } = useHeaderSetting()
</script>

<style lang="less">
  .layout_feature {
    display: flex;
    align-items: center;
    min-width: 160px;
    height: 100%;
    &-item {
      margin-right: 12px;
    }
    &-divider {
      height: 50%;
      margin-left: 12px;
      margin-right: 12px;
      border-color: rgba(0, 0, 0, .3);
    }
  }
</style>