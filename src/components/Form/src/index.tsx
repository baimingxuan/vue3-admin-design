import { defineComponent, ref, reactive } from 'vue'
import { Card, Row, Col, Space, Form, Button } from 'ant-design-vue'
import FormItem from './components/FormItem'
import { formProps } from './props'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'BasicForm',
  props: formProps,
  emits: ['submit', 'reset', 'cancle', 'fieldValueChange'],
  setup(props, { emit }) {
    const formRef = ref(null)
    const formModel = reactive({})

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      emit('fieldValueChange', key, value)
    }

    function handleSubmit() {
      emit('submit', formModel)
    }

    function handleReset() {
      emit('reset')
    }

    return () => (
      <Card>
        <Form
          ref={formRef}
          model={formModel}
          colon={false}
          layout={props.layout}
          disabled={props.disabled}
          labelAlign={props.labelAlign}
          labelCol={props.labelCol}
          wrapperCol={props.wrapperCol}
        >
          <Row>
            {formSchemas.map(schema => (
              <FormItem schema={schema} formProps={props} formModel={formModel} setFormModel={setFormModel} />
            ))}
            <Col>
              <Form.Item>
                <Space>
                  <Button type='primary' onClick={handleSubmit}>
                    查询
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
})
