import type { CSSProperties } from 'vue'
import { defineComponent, computed, unref } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const iconStyle = computed((): CSSProperties => {
      let size = `${props.size}`
      size = `${size.replace('px', '')}px`
      return {
        width: size,
        height: size
      }
    })

    return () => (
      <svg class={styles['svg-icon']} style={unref(iconStyle)} aria-hidden='true'>
        <use href={unref(symbolId)} />
      </svg>
    )
  }
})
