import { defineComponent, computed, unref } from 'vue'
import { Layout } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import LayoutSetting from './setting'
import LayoutSider from './sider'
import LayoutHeader from './header'
import LayoutBasicHeader from './header/BasicHeader'
import LayoutPage from './content'

export default defineComponent({
  name: 'BasicLayout',
  setup() {
    const { getIsHeaderMenu, getIsHybridMenu } = useMenuSetting()

    const getLayoutClass = computed(() => {
      const cls: string[] = []
      if (unref(getIsHybridMenu)) {
        cls.push('ant-layout-has-sider')
      }
      return cls
    })

    return () => (
      <Layout>
        {unref(getIsHeaderMenu) ? <LayoutHeader /> : <></>}
        <Layout class={unref(getLayoutClass)}>
          <LayoutSider />
          <Layout>
            {!unref(getIsHeaderMenu) ? <LayoutBasicHeader /> : <></>}
            <Layout.Content class='content-wrapper'>
              <LayoutPage />
            </Layout.Content>
          </Layout>
        </Layout>
        <LayoutSetting />
      </Layout>
    )
  }
})
