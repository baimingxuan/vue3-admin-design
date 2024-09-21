import type { PropType } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { Col, Space, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'

interface ActionBtnState {
  text?: string
  icon?: string
  show?: boolean
}

export default defineComponent({
  name: 'FormAction',
  props: {
    submitBtn: {
      type: Object as PropType<ActionBtnState>,
      default: () => ({
        text: '查询',
        show: true
      })
    },
    resetBtn: {
      type: Object as PropType<ActionBtnState>,
      default: () => ({
        text: '重置',
        show: true
      })
    },
    showAdvanced: {
      type: Boolean,
      default: true
    },
    isAdvanced: {
      type: Boolean,
      default: true
    }
  },
  emits: ['submitAction', 'resetAction', 'toggleAdvanced'],
  setup(props, { slots, emit }) {
    const isExpanded = ref(false)

    function handleSubmit() {
      emit('submitAction')
    }

    function handleReset() {
      emit('resetAction')
    }
    function toggleAdvanced() {
      isExpanded.value = !isExpanded.value
      emit('toggleAdvanced')
    }

    return () => (
      <Col>
        <Form.Item>
          <Space>
            {slots.frontAction?.()}
            {props.resetBtn.show && (
              <Button type='default' onClick={handleReset}>
                {props?.resetBtn?.text}
              </Button>
            )}
            {slots.middleAction?.()}
            {props.submitBtn.show && (
              <Button type='primary' onClick={handleSubmit}>
                {props?.submitBtn?.text}
              </Button>
            )}
            {slots.backAction?.()}
            {props.showAdvanced && (
              <Button type='link' size='small' onClick={toggleAdvanced}>
                <span>{unref(isExpanded) ? '收起' : '展开'}</span>
                <DownOutlined class={[styles['basic-form-advanced'], { [styles['active']]: isExpanded.value }]} />
              </Button>
            )}
          </Space>
        </Form.Item>
      </Col>
    )
  }
})
