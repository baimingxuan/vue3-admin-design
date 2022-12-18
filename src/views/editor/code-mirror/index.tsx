import { defineComponent, ref, reactive, shallowRef } from 'vue'
import { Button, Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { CODEMIRROR_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Toolbar from './components/Toolbar'
import CodeInfo from './components/CodeInfo'

export default defineComponent({
  name: 'CodeMirror',
  setup() {
    const codeRef = ref(`console.log('Hello, world!')`)
    const extensions = [javascript()]

    const config = reactive({
      language: 'javascript',
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      height: '350px'
    })

    // Codemirror EditorView instance ref
    const view = shallowRef()
    function handleReady(payload) {
      view.value = payload.view
    }
    
    function openGithub() {
      openWindow(CODEMIRROR_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='CodeMirror代码编辑器'>
        {{
          header: () => <>
            <p>VueCodeMirror: 是一款基于vue的代码编辑器, 可支持html、javascript、typescript等。</p>
            <p>组件地址:<Button type='link' onClick={openGithub}>立即访问</Button></p>
          </>,
          default: () => (
            <Card bordered={false}>
              <Toolbar config={config} />
              <Codemirror
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
                placeholder="Please enter the code..."
                onReady={handleReady}
              />
              <CodeInfo />
            </Card>
          )
        }}
      </PageWrapper>
    )
  }
})