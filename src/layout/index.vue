<template>
  <AntLayout :class="prefixCls">
    <LayoutHeader v-if="getIsHeaderMenu" />
    <AntLayout :class="getLayoutClass">
      <LayoutSider />
      <AntLayout>
        <LayoutSimpleHeader v-if="!getIsHeaderMenu" />
        <AntContent class="cont-height">
          <LayoutPage />
        </AntContent>
      </AntLayout>
    </AntLayout>
    <Setting />
  </AntLayout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout as AntLayout } from 'ant-design-vue'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import Setting from './setting/index.vue'
  import BasicSider from './sider/BasicSider.vue'
  import HybridSider from './sider/HybridSider/index.vue'
  import LayoutSider from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutSimpleHeader from './header/SimpleHeader.vue'
  import LayoutPage from './content/index'

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      AntLayout,
      AntSider: AntLayout.Sider,
      LayoutHeader,
      LayoutSimpleHeader,
      LayoutSider,
      AntContent: AntLayout.Content,
      Setting,
      BasicSider,
      HybridSider,
      LayoutPage
    },

    setup() {
      const prefixCls = 'layout-container'

      const { getIsHeaderMenu, getIsHybridMenu } = useMenuSetting()

      const getLayoutClass = computed(() => {
        let cls: string[] = []
        if (unref(getIsHybridMenu)) {
          cls.push('ant-layout-has-sider')
        }
        return cls
      })

      return {
        prefixCls,
        getIsHeaderMenu,
        getLayoutClass
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
    
    .cont-height {
      height: calc(100vh - 80px);
      overflow-y: auto;
    }
  }
</style>
