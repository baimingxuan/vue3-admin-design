import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { Switch } from 'ant-design-vue'
import type { HandlerEnum } from '../enum'
import { baseHandler } from '../handler'

export default defineComponent({
  name: 'SwitchItem',
  components: { Switch },
  props: {
    title: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    def: {
      type: Boolean
    },
    event: {
      type: Number as PropType<HandlerEnum>
    }
  },
  setup(props) {
    function handleChange(checked: CheckedType) {
      props.event && baseHandler(props.event, checked)
    }

    return () => (
      <div class='flex-between-h' style='margin: 16px 0;'>
        <span>{props.title}</span>
        <Switch style='min-width: 40px;' checked={props.def} disabled={props.disabled} onChange={handleChange} />
      </div>
    )
  }
})
