import { defineComponent, unref } from 'vue'
import Page from './components/Page'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import './index.less'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const { getOpenPageLoading } = useTransitionSetting()

    return () => (
      <div class='layout_content' v-loading={unref(getOpenPageLoading)}>
        <Page />
      </div>
    )
  }
})
