import { defineComponent, ref } from 'vue'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const content = ref('')
    return () => (
      <PageWrapper name='Markdown编辑器'>
        {{
          header: () => <>
            <p>VMdEditor: 是一款基于vue的Markdown编辑器,比较适合博客系统。</p>
            <p>github地址: 立即访问 </p>
          </>,
          default: () => <v-md-editor v-model={content.value} height='400px' />
        }}
      </PageWrapper>
    )
  }
})