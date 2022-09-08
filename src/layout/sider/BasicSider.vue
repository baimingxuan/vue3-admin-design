<template>
  <AntdSider
    v-if="getShowSider"
    ref="siderRef"
    breakpoint="lg"
    collapsible
    class="layout_basic-sider"
    v-bind="getTriggerAttr"
    :theme="getMenuTheme"
    :width="getMenuWidth"
    :collapsed="getMenuFold"
  >
    <template #trigger v-if="getShowTrigger">
      <SiderTrigger />
    </template>
    <LayoutMenu />
    <DragBar ref="dragBarRef" />
  </AntdSider>
</template>

<script lang="ts" setup>
  import { unref, computed } from 'vue'
  import { LayoutSider as AntdSider } from 'ant-design-vue'

  import SiderTrigger from './components/SiderTrigger.vue'
  import DragBar from './components/DragBar.vue'
  import LayoutMenu from '@/layout/menu/index.vue'
  import { MenuTypeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  const { getMenuType, getMenuTheme, getMenuWidth, getMenuFold, getMenuFoldBtn, getMenuSplit } = useMenuSetting()
  const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.SIDER)
  const getTriggerAttr = computed(() => unref(getShowTrigger) ? {} : { trigger: null })
  const getShowSider = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.SIDER_MENU || (unref(getMenuType) === MenuTypeEnum.HEADER_MENU && unref(getMenuSplit))
  })

</script>

<style lang="less" scoped>
  .layout_basic-sider {
    height: 100vh;
  }
</style>