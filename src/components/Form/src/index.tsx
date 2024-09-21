import { defineComponent, ref, reactive } from 'vue'
import { Row, Card, Form } from 'ant-design-vue'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
import { formProps } from './props'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'BasicForm',
  props: formProps,
  emits: ['submit', 'reset', 'cancle', 'fieldValueChange'],
  setup(props, { slots, emit }) {
    const formRef = ref(null)
    const formModel = reactive({})

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      emit('fieldValueChange', key, value)
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
          <Row gutter={[0, 14]}>
            {formSchemas.map(schema => (
              <FormItem schema={schema} formProps={props} formModel={formModel} setFormModel={setFormModel} />
            ))}
            <FormAction>
              {{
                frontAction: (data: any) => slots.frontAction?.(data),
                middleAction: (data: any) => slots.middleAction?.(data),
                backAction: (data: any) => slots.backAction?.(data)
              }}
            </FormAction>
          </Row>
        </Form>
      </Card>
    )
  }
})
