import { defineComponent, ref, reactive } from 'vue'
import { Card, Flex, Form } from 'ant-design-vue'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
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
          <Flex wrap='wrap' align='space-between' style={{ height: '90px' }}>
            {formSchemas.map(schema => (
              <FormItem schema={schema} formProps={props} formModel={formModel} setFormModel={setFormModel} />
            ))}
            <div style={{ marginLeft: 'auto' }}>
              <FormAction />
            </div>
          </Flex>
        </Form>
      </Card>
    )
  }
})
