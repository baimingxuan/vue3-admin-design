import type LogicFlow from '@logicflow/core'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BpmnPattern',
  props: {
    lf: {
      type: Object as () => LogicFlow,
      default: null
    }
  },
  setup(props) {
    function addStartNode() {
      props.lf.dnd.startDrag({
        type: 'bpmn:startEvent',
        text: '开始'
      })
    }
    function addUserTask() {
      props.lf.dnd.startDrag({
        type: 'bpmn:userTask'
      })
    }
    function addServiceTask() {
      props.lf.dnd.startDrag({
        type: 'bpmn:serviceTask'
      })
    }
    function addGateWay() {
      props.lf.dnd.startDrag({
        type: 'bpmn:exclusiveGateway'
      })
    }
    function addEndNode() {
      props.lf.dnd.startDrag({
        type: 'bpmn:endEvent',
        text: '结束'
      })
    }
    function openSelection() {
      props.lf.updateEditConfig({
        stopMoveGraph: true
      })
    }
    props.lf &&
      props.lf.on('selection:selected', () => {
        props.lf.updateEditConfig({
          stopMoveGraph: false
        })
      })
    return () => (
      <div className='pattern'>
        <div className='pattern-selection' onMouseDown={() => openSelection()} />
        <div>选区</div>
        <div className='pattern-start' onMouseDown={() => addStartNode()} />
        <div>开始</div>
        <div className='pattern-user' onMouseDown={() => addUserTask()}></div>
        <div>用户任务</div>
        <div className='pattern-user' onMouseDown={() => addServiceTask()}></div>
        <div>系统任务</div>
        <div className='pattern-condition' onMouseDown={() => addGateWay()}></div>
        <div>条件判断</div>
        <div className='pattern-end' onMouseDown={() => addEndNode()}></div>
        <div>结束</div>
      </div>
    )
  }
})
