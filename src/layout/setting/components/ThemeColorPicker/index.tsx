import type { PropType } from 'vue'
import type { ColorItem, HandlerEnum } from '../../enum'
import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { baseHandler } from '../../handler'
import styles from './index.module.less'

export default defineComponent({
  name: 'ThemeColorPicker',
  components: { Tooltip, CheckOutlined },
  props: {
    colorList: {
      type: Array as PropType<ColorItem[]>,
      default: () => []
    },
    event: {
      type: Number as PropType<HandlerEnum>
    },
    def: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    function handlePicker(color: string) {
      props.event && baseHandler(props.event, color)
    }

    return () => (
      <div class={styles['theme-color-picker']}>
        {props.colorList.map(item => (
          <Tooltip key={item.color} title={item.name} placement='top'>
            <span
              class={[
                styles['theme-color-picker__item'],
                { [styles['theme-color-picker__item--active']]: props.def === item.color }
              ]}
              style={{ background: item.color }}
              onClick={() => handlePicker(item.color)}
            >
              {props.def === item.color && <CheckOutlined />}
            </span>
          </Tooltip>
        ))}
      </div>
    )
  }
})
