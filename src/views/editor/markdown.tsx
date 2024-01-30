import { defineComponent, ref, unref } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { MARKDOWN_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const content = ref('')
    const { getAppMode } = useBaseSetting()

    return () => (
      <PageWrapper plugin={MARKDOWN_EDITOR_PLUGIN}>
        <Card>
          <MdEditor v-model={content.value} theme={unref(getAppMode)} />
        </Card>
      </PageWrapper>
    )
  }
})
