import { defineComponent, ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import LogicFlow from '@logicflow/core'
import NodePanel from './components/NodePanel'
import RegisteNode from './register'
import { themeApprove, demoData } from './data'
import '@logicflow/core/dist/style/index.css'

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  grid: {
    size: 10,
    visible: true,
    type: 'mesh',
    config: {
      color: '#DCDCDC' // 设置网格的颜色
    }
  },
  keyboard: { enabled: true },
  style: themeApprove
}

export default defineComponent({
  name: 'Approve',
  setup() {
    const lf = ref(null) as unknown as LogicFlow

    onMounted(() => {
      lf.value = new LogicFlow({
        ...config,
        container: document.querySelector('#graphApprove') as HTMLElement
      })
      RegisteNode(lf)
      lf.value.render(demoData)
      initEvent(lf)
    })

    const initEvent = (lf: LogicFlow) => {
      lf.value?.on('element:click', () => {
        console.log(JSON.stringify(lf.value?.getGraphData()))
      })
      lf.value?.on('connection:not-allowed', (data: any) => {
        message.error(data.msg)
      })
    }

    return () => (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {lf.value && <NodePanel lf={lf} />}
        <div id='graphApprove' style={{ height: '100%' }} />
      </div>
    )
  }
})
