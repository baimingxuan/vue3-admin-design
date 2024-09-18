import { defineComponent } from 'vue'
import { Col, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'FormAction',
  props: {
    isAdvanced: {
      type: Boolean,
      default: true
    }
  },
  emits: ['toggleAdvanced'],
  setup(_, { slots, emit }) {
    function toggleAdvanced() {
      emit('toggleAdvanced')
    }

    return () => (
      <Col>
        <Form.Item>
          {slots.frontAction?.()}
          <Button type='primary'>查询</Button>
          {slots.middleAction?.()}
          <Button type='default'>重置</Button>
          {slots.backAction?.()}
          <Button type='link' size='small' onClick={toggleAdvanced}>
            展开
            <DownOutlined />
          </Button>
        </Form.Item>
      </Col>
    )
  }
})
