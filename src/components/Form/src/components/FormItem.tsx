import type { PropType, Ref } from 'vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { defineComponent, ref, unref, computed, toRefs } from 'vue'
import { Col, Form } from 'ant-design-vue'
import { upperFirst } from 'lodash-es'
import { isNumber } from '@/utils/is'
import { compoMap } from '../compoMap'

export default defineComponent({
  name: 'FormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchemaType>,
      default: () => ({})
    },
    formRef: {
      type: Object as PropType<FormRefType>,
      default: () => ({})
    },
    formProps: {
      type: Object as PropType<FormPropsType>,
      default: () => ({})
    },
    formModel: {
      type: Object as PropType<Recordable<any>>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null
    },
    formDefaultVal: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    }
  },
  setup(props) {
    const { schema, formProps } = toRefs(props) as {
      schema: Ref<FormSchemaType>
      formProps: Ref<FormPropsType>
    }

    const { field, label, rules, isRender = true, isShow = true } = props.schema

    const itemIsShow = ref(isShow)
    const itemIsRender = ref(isRender)

    const getLabelProps = computed(() => {
      const schemaItem = unref(schema)

      const { labelWidth } = schemaItem
      const { labelCol = {}, wrapperCol = {}, labelAlign } = schemaItem.itemProps || {}
      const {
        labelWidth: globalLabelWidth,
        labelCol: globalLabelCol,
        wrapperCol: globWrapperCol,
        labelAlign: globalLabelAlign,
        layout
      } = unref(formProps)

      if (!globalLabelWidth && !labelWidth && !globalLabelCol) {
        return { labelCol, wrapperCol }
      }

      let width = labelWidth || globalLabelWidth
      const col = { ...globalLabelCol, ...labelCol }
      const wrapCol = { ...globWrapperCol, ...wrapperCol }
      const align = labelAlign || globalLabelAlign

      if (width) {
        width = isNumber(width) ? `${width}px` : width
      }

      return {
        labelCol: { style: { width }, ...col },
        wrapperCol: {
          style: { width: layout === 'vertical' ? '100%' : `calc(100% - ${width})` },
          ...wrapCol
        },
        labelAlign: align
      }
    })

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
        <Col v-show={unref(itemIsShow)}>
          <Form.Item name={field} label={label} rules={rules}>
            {renderComponent()}
          </Form.Item>
        </Col>
      )
  }
})
