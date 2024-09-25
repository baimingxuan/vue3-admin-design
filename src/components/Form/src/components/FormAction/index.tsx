import type { PropType } from 'vue'
import type { ActionBtnType } from '../../types'
import { defineComponent } from 'vue'
import { Col, Space, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'FormAction',
  props: {
    submitBtnProps: {
      type: Object as PropType<ActionBtnType>,
      default: () => ({
        text: '查询',
        show: true
      })
    },
    resetBtnProps: {
      type: Object as PropType<ActionBtnType>,
      default: () => ({
        text: '重置',
        show: true
      })
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    showAdvancedBtn: {
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
    const { submitBtnProps, resetBtnProps } = props

    return () => (
      <Col>
        <div style={{ textAlign: 'right' }}>
          <Form.Item>
            <Space>
              {slots.frontAction?.()}
              {resetBtnProps.show && (
                <Button type='default' icon={resetBtnProps?.icon} onClick={() => emit('resetAction')}>
                  {resetBtnProps.text}
                </Button>
              )}
              {slots.middleAction?.()}
              {submitBtnProps.show && (
                <Button
                  type='primary'
                  loading={props.isSubmitting}
                  icon={submitBtnProps?.icon}
                  onClick={() => emit('submitAction')}
                >
                  {submitBtnProps.text}
                </Button>
              )}
              {slots.backAction?.()}
              {props.showAdvancedBtn && (
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
