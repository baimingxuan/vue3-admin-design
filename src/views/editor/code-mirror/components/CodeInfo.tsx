import { defineComponent } from 'vue'
import { Form, FormItem } from 'ant-design-vue'

export default defineComponent({
  name: 'CodeInfo',
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    state: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    return () => (
      <div style='padding: 4px 8px; border: solid 1px #ddd;'>
        <Form layout='inline'>
          <FormItem label='Spaces'>
            <span>{props.config.tabSize}</span>
          </FormItem>
          <FormItem label='Length'>
            <span>{props.state.length}</span>
          </FormItem>
          <FormItem label='Lines'>
            <span>{props.state.lines}</span>
          </FormItem>
          <FormItem label='Cursor'>
            <span>{props.state.cursor}</span>
          </FormItem>
          <FormItem label='Selected'>
            <span>{props.state.selected}</span>
          </FormItem>
        </Form>
      </div>
    )
  }
})
