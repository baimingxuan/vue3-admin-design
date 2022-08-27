<template>
  <AntLayout :class="prefixCls">
    <BasicSider />
    <AntLayout>
      <!-- <HybridSider /> -->
      <LayoutHeader />
      <AntContent>
        <LayoutPage />
      </AntContent>
      <!-- <AntLayout>
        <LayoutHeader />
        <AntContent>
          <LayoutPage />
        </AntContent>
      </AntLayout> -->
    </AntLayout>
    <Setting></Setting>
  </AntLayout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout as AntLayout } from 'ant-design-vue'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import Setting from './setting/index.vue'
  import BasicSider from './sider/BasicSider.vue'
  import HybridSider from './sider/HybridSider/index.vue'
  import LayoutHeader from './header/MultipleHeader.vue'
  import LayoutPage from './content/components/Page.vue'

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      AntLayout,
      AntSider: AntLayout.Sider,
      LayoutHeader,
      AntContent: AntLayout.Content,
      Setting,
      BasicSider,
      HybridSider,
      LayoutPage
    },

    setup() {
      const prefixCls = 'layout-container'

      const { getIsHybridMenu } = useMenuSetting()

      const getLayoutCls = computed(() => {
        let cls: string[] = ['ant-layout']
        if (unref(getIsHybridMenu)) {
          cls.push('ant-layout-has-sider')
        }
        return cls
      })

      return {
        prefixCls,
        getLayoutCls
      }
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'layout-container';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
  }
</style>
