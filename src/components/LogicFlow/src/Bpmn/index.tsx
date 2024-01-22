import { defineComponent, onMounted, ref } from 'vue'
import LogicFlow from '@logicflow/core'
import { BpmnElement, Control, Menu, SelectionSelect } from '@logicflow/extension'
import BpmnPattern from './components/Pattern'
import '@logicflow/extension/lib/style/index.css'
import '@logicflow/core/dist/style/index.css'

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
    const lf = ref(null) as unknown as LogicFlow

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
      lf.value = lfInstance
    })

    return () => (
      <div style='position: relative; height: 100%; overflow: hidden;'>
        <div id='graphBpmn' style='height: 100%;' />
        <div>{lf.value && <BpmnPattern lf={lf} />}</div>
      </div>
    )
  }
})
