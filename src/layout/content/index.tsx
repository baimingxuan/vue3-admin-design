import { defineComponent } from 'vue'
import Page from './components/Page.vue'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import moduleStyle from './index.module.less'

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const { getOpenPageLoading } = useTransitionSetting()

    return () => (
      <div
        class={moduleStyle['layout_content']}
        v-loading={getOpenPageLoading}
      >
        <Page />
      </div>
    )
  }
})