import type { PropType } from 'vue'
import type LogicFlow from '@logicflow/core'
import type { HtmlNodeConfig } from '../../type'
import { defineComponent } from 'vue'
import { approveNodes } from '../../data'
import styles from './index.module.less'

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
      props.lf.value?.dnd.startDrag({
        type: node.type,
        text: node.label
      })
    }

    return () => (
      <div class={styles['node-panel']}>
        {approveNodes.map((node: HtmlNodeConfig) => {
          return (
            <div class={styles['node-item']} key={node.type}>
              <div style={{ ...node.style }} onMousedown={dragNode(node)} />
              <div class={styles['name']}>{node.label}</div>
            </div>
          )
        })}
      </div>
    )
  }
})
