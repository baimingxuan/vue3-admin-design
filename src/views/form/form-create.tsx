import { defineComponent } from 'vue'
import { Card as AntdCard } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { FORM_CREATE_DESIGNER } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'Markdown',
  setup() {

    return () => (
      <PageWrapper plugin={FORM_CREATE_DESIGNER}>
        {{
          default: () => <AntdCard bordered={false}>
            <fc-designer height='664px' />
          </AntdCard>
        }}
      </PageWrapper>
    )
  }
})