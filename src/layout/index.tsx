import { defineComponent, computed, unref } from 'vue'
import { Layout } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useLayout } from './useLayout'
import LayoutSetting from './setting'
import LayoutSider from './sider'
import LayoutHeader from './header'
import LayoutTags from './tags'
import LayoutPage from './content'

export default defineComponent({
  name: 'BasicLayout',
  setup() {
    const { getIsHeaderMenu, getIsHybridMenu, getMenuSplit } = useMenuSetting()
    const { getContentHeight } = useLayout()

    const getLayoutClass = computed(() => {
      const cls: string[] = []
      if (unref(getIsHybridMenu)) {
        cls.push('ant-layout-has-sider')
      }
      return cls
    })

    return () => (
      <Layout>
        {unref(getIsHeaderMenu) && <LayoutHeader isHeaderMenu={true} />}
        <Layout class={unref(getLayoutClass)}>
          <LayoutSider />
          <Layout>
            {!unref(getIsHeaderMenu) && <LayoutHeader />}
            {unref(getIsHeaderMenu) && unref(getMenuSplit) && <LayoutTags isHeaderTags={false} />}
            <Layout.Content style={{ height: unref(getContentHeight), overflowY: 'auto' }}>
              <LayoutPage />
            </Layout.Content>
          </Layout>
        </Layout>
        <LayoutSetting />
      </Layout>
    )
  }
})
