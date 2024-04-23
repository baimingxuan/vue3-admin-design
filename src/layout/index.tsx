import { defineComponent, computed, unref } from 'vue'
import { Layout } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { useLockPage } from '@/hooks/web/useLockPage'
import { useLayout } from './useLayout'
import LayoutSetting from './setting'
import LayoutSider from './sider'
import LayoutHeader from './header'
import LayoutTags from './tags'
import LayoutPage from './content'
import LayoutFooter from './footer'
import LayoutLockPage from './lock'

export default defineComponent({
  name: 'BasicLayout',
  setup() {
    const { getShowFooter } = useBaseSetting()
    const { getIsHeaderMenu, getIsHybridMenu, getMenuSplit } = useMenuSetting()
    const { getContentHeight } = useLayout()

    // Create a lock screen monitor
    const lockEvents = useLockPage()

    const getLayoutClass = computed(() => {
      const cls: string[] = []
      if (unref(getIsHybridMenu)) {
        cls.push('ant-layout-has-sider')
      }
      return cls
    })

    return () => (
      <Layout {...unref(lockEvents)}>
        {unref(getIsHeaderMenu) && <LayoutHeader isHeaderMenu={true} />}
        <Layout class={unref(getLayoutClass)}>
          <LayoutSider />
          <Layout>
            {!unref(getIsHeaderMenu) && <LayoutHeader />}
            {unref(getIsHeaderMenu) && unref(getMenuSplit) && <LayoutTags isHeaderTags={false} />}
            <Layout.Content style={{ height: unref(getContentHeight), overflowY: 'auto' }}>
              <LayoutPage />
            </Layout.Content>
            {unref(getShowFooter) && <LayoutFooter />}
          </Layout>
        </Layout>
        <LayoutSetting />
        <LayoutLockPage />
      </Layout>
    )
  }
})
