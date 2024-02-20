import { defineComponent, unref } from 'vue'
import Page from './components/Page'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import moduleStyle from './index.module.less'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const { getOpenPageLoading } = useTransitionSetting()

    return () => (
      <div class={moduleStyle['layout_content']} v-loading={unref(getOpenPageLoading)}>
        <Page />
      </div>
    )
  }
})
