<template>
  <Layout :class="prefixCls">
    <LayoutHeader v-if="getIsHeaderMenu" />
    <Layout :class="getLayoutClass">
      <LayoutSider />
      <Layout>
        <LayoutBasicHeader v-if="!getIsHeaderMenu" />
        <Layout.Content class="cont-height">
          <LayoutPage />
        </Layout.Content>
      </Layout>
    </Layout>
    <Setting />
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'

  import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
  import Setting from './setting/index.vue'
  import BasicSider from './sider/BasicSider.vue'
  import HybridSider from './sider/HybridSider/index.vue'
  import LayoutSider from './sider/index.vue'
  import LayoutHeader from './header/index.vue'
  import LayoutBasicHeader from './header/BasicHeader'
  import LayoutPage from './content/index'

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      Layout,
      LayoutHeader,
      LayoutBasicHeader,
      LayoutSider,
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
