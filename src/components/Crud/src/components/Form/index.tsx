import { defineComponent, ref, reactive, h } from 'vue'
import { Card, Form, FormItem } from 'ant-design-vue'
import { formProps } from '../../props'
import { compoMap } from '../../compoMap'
import { formSchemas } from '../../../data'

export default defineComponent({
  name: 'CrudForm',
  props: formProps,
  emits: ['submit', 'reset', 'cancle'],
  setup(props) {
    const formRef = ref(null)
    const formModel = reactive({})

    const getFormCompo = (compo: string) => {
      return compoMap.get(compo) as ReturnType<typeof defineComponent>
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
          {Object.entries(formSchemas).map(([key, schema]) => (
            <FormItem label={schema.label} name={key} rules={schema.rules}>
              {h(getFormCompo(schema.type), schema?.props)}
            </FormItem>
          ))}
        </Form>
      </Card>
    )
  }
})
