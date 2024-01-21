import { defineComponent, onMounted } from 'vue'
import LogicFlow from '@logicflow/core'
import { BpmnElement, Control, Menu, SelectionSelect } from '@logicflow/extension'
import BpmnPattern from './pattern'
import './index.css'
import '@logicflow/extension/lib/style/index.css'

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  metaKeyMultipleSelected: true,
  grid: {
    size: 10,
    type: 'dot'
  },
  keyboard: {
    enabled: true
  },
  snapline: true
}

export default defineComponent({
  name: 'Bpmn',
  setup() {
    let lf = null as unknown as LogicFlow

    onMounted(() => {
      LogicFlow.use(BpmnElement)
      LogicFlow.use(Control)
      LogicFlow.use(Menu)
      LogicFlow.use(SelectionSelect)
      const lfInstance = new LogicFlow({
        ...config,
        container: document.querySelector('#graphBpmn') as HTMLElement
      })
      lfInstance.render()
      lf = lfInstance
    })

    return () => (
      <div className='bpmn-container'>
        <div id='graphBpmn' className='viewport' />
        <div>
          <BpmnPattern lf={lf} />
        </div>
      </div>
    )
  }
})
