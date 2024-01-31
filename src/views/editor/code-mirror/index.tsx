import { defineComponent, ref, reactive, shallowRef, onMounted, onActivated } from 'vue'
import { Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { CODEMIRROR_PLUGIN } from '@/settings/websiteSetting'
import { removeClass } from '@/utils/dom'
import { Codemirror } from 'vue-codemirror'
import Toolbar from './components/Toolbar'
import CodeInfo from './components/CodeInfo'

export default defineComponent({
  name: 'CodeMirror',
  setup() {
    const codeRef = ref(`console.log('Hello, world!')`)
    const extensions = []

    const config = reactive({
      language: 'javascript',
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      height: '500px'
    })

    const state = reactive({
      lines: null as null | number,
      cursor: null as null | number,
      selected: null as null | number,
      length: null as null | number
    })

    // 解决与Markdown编辑器样式冲突的问题
    onMounted(() => {
      const cmEditorRef = document.querySelector('.cm-editor')
      if (cmEditorRef) {
        removeClass(cmEditorRef, 'cm-editor')
      }
    })
    onActivated(() => {
      const cmEditorRef = document.querySelector('.cm-editor')
      if (cmEditorRef) {
        removeClass(cmEditorRef, 'cm-editor')
      }
    })

    // Codemirror EditorView instance ref
    const cmView = shallowRef()
    function handleReady({ view }: any) {
      cmView.value = view
    }

    function handleStateUpdate(viewUpdate: any) {
      const ranges = viewUpdate.state.selection.ranges
      state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
      state.cursor = ranges[0].anchor
      state.length = viewUpdate.state.doc.length
      state.lines = viewUpdate.state.doc.lines
    }

    return () => (
      <PageWrapper plugin={CODEMIRROR_PLUGIN}>
        <Card>
          <Toolbar config={config} />
          <Codemirror
            id='codeMirror'
            v-model={codeRef.value}
            style={{
              height: config.height,
              borderLeft: 'solid 1px #ddd',
              borderRight: 'solid 1px #ddd'
            }}
            autofocus={config.autofocus}
            indentWithTab={config.indentWithTab}
            tabSize={config.tabSize}
            extensions={extensions}
            placeholder='Please enter the code...'
            onReady={handleReady}
            onUpdate={handleStateUpdate}
          />
          <CodeInfo config={config} state={state} />
        </Card>
      </PageWrapper>
    )
  }
})
