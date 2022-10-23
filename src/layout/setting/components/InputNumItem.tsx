  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'

  import { InputNumber as AntdInputNum } from 'ant-design-vue'
  import { HandlerEnum } from '../enum'
  import { baseHandler } from '../handler'

  export default defineComponent({
    name: 'InputNumItem',
    components: { AntdInputNum },
    props: {
      title: {
        type: String,
        default: ''
      },
      event: {
        type: Number as PropType<HandlerEnum>
      }
    },
    setup(props, { attrs }) {
      function handleChange(value: number | string) {
        props.event && baseHandler(props.event, value)
      }

      return () => (
        <div class='flex-between-h' style='margin: 16px 0;'>
          <span>{props.title}</span>
          <AntdInputNum
            style='width: 120px;'
            size='small'
            {...attrs}
            onChange={handleChange}
          />
        </div>
      )
    }
  })
