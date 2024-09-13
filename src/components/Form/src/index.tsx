import { defineComponent, ref, reactive } from 'vue'
import { Card, Form } from 'ant-design-vue'
import FormItem from './components/FormItem'
import { formProps } from './props'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'BasicForm',
  props: formProps,
  emits: ['submit', 'reset', 'cancle'],
  setup(props) {
    const formRef = ref(null)
    const formModel = reactive({})

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
          {formSchemas.map(schema => (
            <FormItem schema={schema} formModel={formModel} />
          ))}
        </Form>
      </Card>
    )
  }
})
