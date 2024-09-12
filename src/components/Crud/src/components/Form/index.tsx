import { defineComponent, reactive, h } from 'vue'
import { Card, Form, FormItem } from 'ant-design-vue'
import { compoMap } from '../../compoMap'
import { formSchemas } from '../../../data'

export default defineComponent({
  name: 'CrudForm',
  emits: ['submit', 'reset', 'cancle'],
  setup(props) {
    const formModel = reactive({})

    const getFormCompo = (compo: string) => {
      return compoMap.get(compo) as ReturnType<typeof defineComponent>
    }

    return () => (
      <Card>
        <Form
          model={formModel}
          layout='horizontal'
          colon={false}
          // labelCol={{ style: { width: '200px' } }}
          wrapperCol={{ span: 8 }}
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
