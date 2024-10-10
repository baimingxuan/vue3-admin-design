import type { PropType } from 'vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { defineComponent, ref, unref, computed } from 'vue'
import { Col, Form } from 'ant-design-vue'
import { upperFirst } from 'lodash-es'
import { isNumber, isFunction } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
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
  setup(props, { slots }) {
    const { field, label, rules, isRender = true, isShow = true } = props.schema

    const itemIsShow = ref(isShow)
    const itemIsRender = ref(isRender)

    const getLabelWidthProp = computed(() => {
      const { labelWidth, disabledLabelWidth } = props.schema
      const { labelCol = {}, wrapperCol = {} } = props.schema.itemProps || {}
      const {
        labelWidth: globalLabelWidth,
        labelCol: globalLabelCol,
        wrapperCol: globWrapperCol,
        layout
      } = props.formProps

      if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
        return { labelCol, wrapperCol }
      }

      let width = labelWidth || globalLabelWidth
      const col = { ...globalLabelCol, ...labelCol }
      const wrapCol = { ...globWrapperCol, ...wrapperCol }

      if (width) {
        width = isNumber(width) ? `${width}px` : width
      }

      return {
        labelCol: { style: { width }, ...col },
        wrapperCol: {
          style: { width: layout === 'vertical' ? '100%' : `calc(100% - ${width})` },
          ...wrapCol
        }
      }
    })

    const getValues = computed(() => {
      const { schema, formModel, formDefaultVal } = props

      return {
        field: schema.field,
        model: formModel,
        values: {
          ...formDefaultVal,
          ...formModel
        } as Recordable<any>,
        schema: schema
      }
    })

    const getComponentsProps = computed(() => {
      const { schema, formModel, formRef } = props
      let { componentProps = {} } = schema

      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, formModel, formRef }) ?? {}
      }

      return componentProps as Recordable<any>
    })

    const getDisabled = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { disabled = false } = unref(getComponentsProps)

      return !!globDisabled || disabled
    })

    const getReadonly = computed(() => {
      const { readonly: globReadonly } = props.formProps
      const { readonly = false } = unref(getComponentsProps)

      return !!globReadonly || readonly
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

    function renderFormItem() {
      const { field, label, itemProps, rules, slot, renderComponent: renderCompo, suffixContent } = props.schema
      const { colon } = props.formProps
      const { labelCol, wrapperCol } = unref(getLabelWidthProp)
      const options = { disabled: unref(getDisabled), readonly: unref(getReadonly) }

      const getContent = () => {
        return slot
          ? getSlot(slots, slot, unref(getValues), options)
          : renderCompo
            ? renderCompo(unref(getValues), options)
            : renderComponent()
      }

      const showSuffixCont = !!suffixContent
      const getSuffixCont = isFunction(suffixContent) ? suffixContent(unref(getValues)) : suffixContent

      return (
        <Form.Item
          name={field}
          label={label}
          colon={colon}
          rules={rules}
          class={{ 'suffix-item': showSuffixCont }}
          {...(itemProps as Recordable<any>)}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>{getContent()}</div>
            {showSuffixCont && <span class='suffix'>{getSuffixCont}</span>}
          </div>
        </Form.Item>
      )
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
