import { defineComponent, ref } from 'vue'
import { Space, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'FormAction',
  props: {
    isAdvanced: {
      type: Boolean,
      default: true
    }
  },
  emits: ['submit', 'reset', 'cancle', 'toggleAdvanced'],
  setup(_, { slots, emit }) {
    const isExpanded = ref(false)

    function handleSubmit() {
      emit('submit')
    }

    function handleReset() {
      emit('reset')
    }
    function toggleAdvanced() {
      isExpanded.value = !isExpanded.value
      emit('toggleAdvanced')
    }

    return () => (
      <Form.Item class={styles['basic-form-action']}>
        <Space>
          {slots.frontAction?.()}
          <Button type='primary' onClick={handleSubmit}>
            查询
          </Button>
          {slots.middleAction?.()}
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
          {slots.backAction?.()}
          <Button type='link' size='small' onClick={toggleAdvanced}>
            <span>展开</span>
            <DownOutlined class={[styles['expand-btn'], { [styles['active']]: isExpanded.value }]} />
          </Button>
        </Space>
      </Form.Item>
    )
  }
})
