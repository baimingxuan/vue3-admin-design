import type { PropType } from 'vue'
import type { HandlerEnum } from '../enum'
import type { SelectOptions } from '@/types'
import { defineComponent, computed, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { baseHandler } from '../handler'

export default defineComponent({
  name: 'SelectItem',
  components: { Select },
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    def: {
      type: [String, Number] as PropType<string | number>
    },
    event: {
      type: Number as PropType<HandlerEnum>
    },
    options: {
      type: Array as PropType<SelectOptions>,
      default: () => []
    }
  },
  setup(props) {
    const getBindValue = computed(() => {
      return props.def ? { value: props.def, defaultValue: props.def } : {}
    })

    function handleChange(value: any) {
      props.event && baseHandler(props.event, value)
    }

    return () => (
      <div class='flex-between-h' style={{ margin: '16px 0' }}>
        <span> {props.title}</span>
        <Select
          {...unref(getBindValue)}
          style={{ width: '120px' }}
          size='small'
          options={props.options}
          disabled={props.disabled}
          onChange={value => handleChange(value)}
        />
      </div>
    )
  }
})
