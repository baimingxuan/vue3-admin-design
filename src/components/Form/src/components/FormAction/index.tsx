import type { PropType } from 'vue'
import type { ActionBtnState } from '../../types'
import { defineComponent } from 'vue'
import { Col, Space, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'

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
    isSubmitting: {
      type: Boolean,
      default: false
    },
    showAdvanced: {
      type: Boolean,
      default: true
    },
    isAdvanced: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submitAction', 'resetAction', 'toggleAdvanced'],
  setup(props, { slots, emit }) {
    const { submitBtn, resetBtn } = props

    return () => (
      <Col>
        <div style={{ textAlign: 'right' }}>
          <Form.Item>
            <Space>
              {slots.frontAction?.()}
              {resetBtn.show && (
                <Button type='default' icon={resetBtn?.icon} onClick={() => emit('resetAction')}>
                  {resetBtn.text}
                </Button>
              )}
              {slots.middleAction?.()}
              {submitBtn.show && (
                <Button
                  type='primary'
                  loading={props.isSubmitting}
                  icon={submitBtn?.icon}
                  onClick={() => emit('submitAction')}
                >
                  {submitBtn.text}
                </Button>
              )}
              {slots.backAction?.()}
              {props.showAdvanced && (
                <Button type='link' size='small' onClick={() => emit('toggleAdvanced')}>
                  <span>{props.isAdvanced ? '收起' : '展开'}</span>
                  <DownOutlined class={[styles['basic-form-advanced'], { [styles['active']]: props.isAdvanced }]} />
                </Button>
              )}
            </Space>
          </Form.Item>
        </div>
      </Col>
    )
  }
})
