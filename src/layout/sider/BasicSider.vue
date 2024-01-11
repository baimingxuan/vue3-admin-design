<template>
  <LayoutSider
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
    <template v-if="getShowTrigger" #trigger>
      <SiderTrigger />
    </template>
    <AppLogo />
    <LayoutMenu :menuMode="MenuModeEnum.INLINE" :isSplitedMenu="getIsSplited" :isHorizontal="false" />
    <DragBar ref="dragBarRef" />
  </LayoutSider>
</template>

<script lang="ts" setup>
import { ref, unref, computed } from 'vue'
import { LayoutSider } from 'ant-design-vue'
import SiderTrigger from './components/SiderTrigger.vue'
import DragBar from './components/DragBar.vue'
import LayoutMenu from '@/layout/menu'
import { AppLogo } from '@/components/Application'
import { MenuTypeEnum, MenuModeEnum, MenuFoldBtnEnum } from '@/enums/menuEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDragLine } from './useLayoutSider'

const siderRef = ref<ElRef>(null)
const dragBarRef = ref<ElRef>(null)

const { getMenuType, getMenuTheme, getMenuWidth, getMenuFold, getMenuFoldBtn, getMenuSplit } = useMenuSetting()
const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.SIDER)
const getTriggerAttr = computed(() => (unref(getShowTrigger) ? {} : { trigger: null }))
const getShowSider = computed(() => {
  return (
    unref(getMenuType) === MenuTypeEnum.SIDER_MENU ||
    (unref(getMenuType) === MenuTypeEnum.HEADER_MENU && unref(getMenuSplit))
  )
})
const getIsSplited = computed(() => unref(getMenuSplit))

useDragLine(siderRef, dragBarRef)
</script>

<style lang="less" scoped>
.layout_basic-sider {
  height: 100vh;
}
</style>
