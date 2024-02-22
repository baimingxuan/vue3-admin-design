import type { PropType, CSSProperties } from 'vue'
import { defineComponent, unref } from 'vue'
import { CheckOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { baseHandler } from '../../handler'
import type { HandlerEnum } from '../../enum'
import styles from './index.module.less'

export default defineComponent({
  name: 'MenuTypePicker',
  props: {
    menuTypeList: {
      type: Array as PropType<any>,
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
    const { getThemeColor } = useBaseSetting()

    const getStyle = (item: any, type: 'item' | 'icon'): CSSProperties => {
      if (item.type === props.def) {
        if (type === 'item') {
          return {
            border: `2px solid ${unref(getThemeColor)}`
          }
        } else if (type === 'icon') {
          return {
            display: 'block',
            color: unref(getThemeColor)
          }
        }
      }
      return {}
    }

    function handlePicker(item: any) {
      baseHandler(props.event!, {
        menuMode: item.mode,
        menuType: item.type
      })
    }

    return () => (
      <div class={styles['menu-type-picker']}>
        {props.menuTypeList.map((item: any) => (
          <Tooltip key={item.title} title={item.title} placement='top'>
            <div
              class={[styles['menu-type-picker__item'], styles[`menu-type-picker__item--${item.type}`]]}
              style={getStyle(item, 'item')}
              onClick={() => handlePicker(item)}
            >
              <div class={styles['hybrid-sider']} />
              <CheckOutlined style={getStyle(item, 'icon')} />
            </div>
          </Tooltip>
        ))}
      </div>
    )
  }
})
