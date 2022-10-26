<template>
  <AntdHeader :class="prefixCls">
    <div :class="`${prefixCls}-main`">
      <div :class="`${prefixCls}-main-left`">
        <FoldTrigger v-if="getShowTrigger" />
        <Breadcrumb v-if="getShowBreadCrumb" />
      </div>
      <div :class="`${prefixCls}-main-right`">
        <LayoutFeature />
      </div>
    </div>
    <LayoutTags v-if="getShowTags" />
  </AntdHeader>
</template>

<script lang="ts" setup>
  import { unref, computed } from 'vue'
  import { LayoutHeader as AntdHeader } from 'ant-design-vue'

  import LayoutTags from '../tags/index.vue'
  import LayoutFeature from '../feature/index.vue'
  import FoldTrigger from './components/FoldTrigger.vue'
  import Breadcrumb from './components/Breadcrumb'

  import { MenuFoldBtnEnum } from '@/enums/menuEnum'
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
  
  const prefixCls = 'layout_simple-header'
  const { getMenuFoldBtn } = useMenuSetting()
  const { getShowTags, getShowBreadCrumb } = useHeaderSetting()

  const getShowTrigger = computed(() => unref(getMenuFoldBtn) === MenuFoldBtnEnum.HEADER)

</script>

<style lang="less" scoped>
  .layout_simple-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
    height: 80px;
    line-height: 80px;
    background: #fff;

    &-main {
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;

      &-left {
        display: flex;
        align-items: center;
      }

    }

  }
</style>