import type { PropType } from 'vue'
import type { FormPropType, FormSchemaType } from '../types'
import { defineComponent, ref, unref, computed } from 'vue'
import { Form } from 'ant-design-vue'
import { upperFirst } from 'lodash-es'
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
      type: Object as PropType<FormPropType>,
      default: () => ({})
    },
    formModel: {
      type: Object as PropType<Recordable<any>>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null
    }
  },
  setup(props) {
    const { field, label, rules, isRender = true, isShow = true } = props.schema

    const itemIsShow = ref(isShow)
    const itemIsRender = ref(isRender)

    function renderComponent() {
      const {
        component,
        componentProps,
        changeEvent = 'change',
        field,
        valueField,
        disabled: schemaDisabled = false,
        readonly: schemaReadonly = false
      } = props.schema
      const { disabled: formDisabled = false, readonly: formReadonly = false, size = 'default' } = props.formProps

      const getDisabled = computed(() => formDisabled || schemaDisabled)

      const getReadonly = computed(() => formReadonly || schemaReadonly)

      const isCheck = component && ['radio', 'checkbox', 'switch'].includes(component)

      const eventKey = `on${upperFirst(changeEvent)}`

      const propsData: Recordable<any> = {
        size,
        allowClear: true,
        disabled: unref(getDisabled),
        readonly: unref(getReadonly),
        ...componentProps
      }

      const bindValue: Recordable<any> = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field]
      }

      const onEvent = {
        [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
          const [e] = args

          if (propsData[eventKey]) {
            propsData[eventKey](...args)
          }

          const target = e ? e.target : null
          const value = target ? (isCheck ? target.checked : target.value) : e

          props.setFormModel(field, value)
        }
      }

      const Compo = compoMap.get(component!) as ReturnType<typeof defineComponent>
      const compoAttr: Recordable<any> = {
        ...propsData,
        ...bindValue,
        ...onEvent
      }

      return <Compo {...compoAttr} />
    }

    return () =>
      unref(itemIsRender) && (
        <Form.Item v-show={unref(itemIsShow)} name={field} label={label} rules={rules}>
          {renderComponent()}
        </Form.Item>
      )
  }
})
