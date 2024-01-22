import type { PropType } from 'vue'
import type LogicFlow from '@logicflow/core'
import { defineComponent, onMounted } from 'vue'
import styles from './index.module.less'

const patternConfig = [
  {
    type: 'bpmn:startEvent',
    text: '开始',
    icon: 'start'
  },
  {
    type: 'bpmn:userTask',
    text: '用户任务',
    icon: 'user'
  },
  {
    type: 'bpmn:serviceTask',
    text: '系统任务',
    icon: 'user'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '条件判断',
    icon: 'condition'
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    icon: 'end'
  }
]

export default defineComponent({
  name: 'Pattern',
  props: {
    lf: {
      type: Object as PropType<LogicFlow>,
      default: () => ({})
    }
  },
  setup(props) {
    onMounted(() => {
      props.lf.value &&
        props.lf.value.on('selection:selected', () => {
          props.lf.value.updateEditConfig({
            stopMoveGraph: false
          })
        })
    })

    return () => (
      <div class={styles['pattern-wrapper']}>
        <div>
          <div
            class={[styles['pattern-item'], styles['selection']]}
            onMousedown={() => {
              props.lf.value.updateEditConfig({
                stopMoveGraph: true
              })
            }}
          />
          <p class={styles['name']}>选区</p>
        </div>
        {patternConfig.map(item => (
          <div>
            <div
              class={[styles['pattern-item'], styles[item.icon]]}
              onMousedown={() => {
                props.lf.value.dnd.startDrag({
                  type: item.type,
                  text: item.text
                })
              }}
            />
            <p class={styles['name']}>{item.text}</p>
          </div>
        ))}
      </div>
    )
  }
})
