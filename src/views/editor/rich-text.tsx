import { defineComponent, ref, shallowRef, onBeforeUnmount } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { WANG_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import '@wangeditor/editor/dist/css/style.css'

export default defineComponent({
  name: 'RichText',
  setup() {
    const editorRef = shallowRef()
    const valueHtml = ref('<p>hello</p>')
    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = editor => {
      editorRef.value = editor
    }

    return () => (
      <PageWrapper plugin={WANG_EDITOR_PLUGIN}>
        <Card>
          <div class='rich-text-wrapper'>
            <Toolbar class='toolbar-box' editor={editorRef.value} defaultConfig={toolbarConfig} mode='default' />
            <Editor
              style='height: 500px; overflow-y: hidden;'
              v-model={valueHtml.value}
              defaultConfig={editorConfig}
              mode='default'
              onOnCreated={handleCreated}
            />
          </div>
        </Card>
      </PageWrapper>
    )
  }
})
