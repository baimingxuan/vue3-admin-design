import type { PropType } from 'vue'
import type { FormSchemaType } from '../types'
import { defineComponent, h } from 'vue'
import { Form } from 'ant-design-vue'
import { compoMap } from '../compoMap'

export default defineComponent({
  name: 'FormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchemaType>,
      default: () => ({})
    },
    formProps: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any, schema: FormSchemaType) => void>,
      default: null
    }
  },
  setup(props) {
    const { field, label, component, componentProps, rules } = props.schema

    const getFormCompo = (compo: any) => {
      return compoMap.get(compo) as ReturnType<typeof defineComponent>
    }

    return () => (
      <Form.Item name={field} label={label} rules={rules}>
        {h(getFormCompo(component), componentProps)}
      </Form.Item>
    )
  }
})
