import { defineComponent, ref, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import NodePanel from './components/NodePanel'
import { themeApprove, demoData } from './data'

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
      lf.value.render()
    })

    return () => (
      <div class='approve-wrapper'>
        <NodePanel lf={lf} />
        <div id='graphApprove' className='viewport' />
      </div>
    )
  }
})
