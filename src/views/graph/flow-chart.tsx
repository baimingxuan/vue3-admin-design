import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { ANTV_G6_PLUGIN } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'FlowChart',
  setup() {
    return () => (
      <PageWrapper plugin={ANTV_G6_PLUGIN}>
        {{
          default: () => <Card></Card>
        }}
      </PageWrapper>
    )
  }
})
