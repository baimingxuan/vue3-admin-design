import type { PropType } from 'vue'
import type LogicFlow from '@logicflow/core'
import type { HtmlNodeConfig } from '../type'
import { defineComponent } from 'vue'
import { approveNodes } from '../data'

export default defineComponent({
  name: 'NodePanel',
  props: {
    lf: {
      type: Object as PropType<LogicFlow>,
      default: () => ({})
    }
  },
  setup(props) {
    const dragNode = (node: HtmlNodeConfig) => {
      props.lf.value.dnd.startDrag({
        type: node.type,
        text: node.label
      })
    }

    return () => (
      <div class='node-panel'>
        {approveNodes.map((node: HtmlNodeConfig) => {
          return (
            <div class='node-item' key={node.type}>
              <div class='node-shape' style={{ ...node.style }} onMousedown={dragNode(node)} />
              <div class='node-label'>{node.label}</div>
            </div>
          )
        })}
      </div>
    )
  }
})
