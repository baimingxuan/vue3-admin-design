import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { FLOW_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import { Approve } from '@/components/LogicFlow'

export default defineComponent({
  name: 'FlowApprove',
  setup() {
    return () => (
      <PageWrapper plugin={FLOW_EDITOR_PLUGIN}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '500px' }}>
            <Approve />
          </div>
        </Card>
      </PageWrapper>
    )
  }
})
