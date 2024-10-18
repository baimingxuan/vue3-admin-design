import type { PropType } from 'vue'
import type { ColPropsType, ActionBtnType } from '../types/form'
import { defineComponent, computed, unref } from 'vue'
import { Col, Space, Form, Button } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'FormAction',
  props: {
    actionColProps: {
      type: Object as PropType<ColPropsType>,
      default: () => ({})
    },
    submitBtnProps: {
      type: Object as PropType<ActionBtnType>,
      default: () => ({})
    },
    resetBtnProps: {
      type: Object as PropType<ActionBtnType>,
      default: () => ({})
    },
    isSubmitting: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    showAdvancedBtn: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    isAdvanced: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    actionColSpan: {
      type: Number as PropType<number>,
      default: 4
    },
    hideAdvanceBtn: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['submitAction', 'resetAction', 'toggleAdvanced'],
  setup(props, { slots, emit }) {
    const { submitBtnProps, resetBtnProps } = props

    const getActionColProps = computed(() => {
      const { actionColProps, actionColSpan } = props

      return {
        ...actionColProps,
        span: actionColSpan
      }
    })

    return () => (
      <Col {...unref(getActionColProps)}>
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
              {props.showAdvancedBtn && !props.hideAdvanceBtn && (
                <Button type='link' size='small' onClick={() => emit('toggleAdvanced')}>
                  <span>{props.isAdvanced ? '展开' : '收起'}</span>
                  <DownOutlined class={['form-advanced', { ['active']: !props.isAdvanced }]} />
                </Button>
              )}
            </Space>
          </Form.Item>
        </div>
      </Col>
    )
  }
})
