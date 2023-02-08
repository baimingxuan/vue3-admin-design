import { defineComponent, ref } from 'vue'
import { PageWrapper } from '@/components/Page'
import { MARKDOWN_EDITOR_PLUGIN } from '@/settings/websiteSetting'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const content = ref('')
    return () => (
      <PageWrapper plugin={MARKDOWN_EDITOR_PLUGIN}>
        {{
          default: () => <v-md-editor v-model={content.value} height='400px' />
        }}
      </PageWrapper>
    )
  }
})