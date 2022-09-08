<template>
  <AntdSider
    ref="siderRef"
    breakpoint="lg"
    collapsible
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
  import { MenuFoldBtnEnum } from '@/enums/menuEnum'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

  const { getMenuTheme, getMenuWidth, getMenuFold, getMenuFoldBtn } = useMenuSetting()
  const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.SIDER)
  const getTriggerAttr = computed(() => unref(getShowTrigger) ? {} : { trigger: null })

</script>