import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'

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
          <Form.Item label='Spaces'>
            <span>{props.config.tabSize}</span>
          </Form.Item>
          <Form.Item label='Length'>
            <span>{props.state.length}</span>
          </Form.Item>
          <Form.Item label='Lines'>
            <span>{props.state.lines}</span>
          </Form.Item>
          <Form.Item label='Cursor'>
            <span>{props.state.cursor}</span>
          </Form.Item>
          <Form.Item label='Selected'>
            <span>{props.state.selected}</span>
          </Form.Item>
        </Form>
      </div>
    )
  }
})