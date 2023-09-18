import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { FORM_CREATE_DESIGNER } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'FormCreate',
  setup() {

    return () => (
      <PageWrapper plugin={FORM_CREATE_DESIGNER}>
        {{
          default: () => <Card bordered={false}>
            <fc-designer height='664px' />
          </Card>
        }}
      </PageWrapper>
    )
  }
})