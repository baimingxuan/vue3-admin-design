import type { PropType } from 'vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { defineComponent, ref, unref, computed } from 'vue'
import { Col, Form } from 'ant-design-vue'
import { upperFirst } from 'lodash-es'
import { isNumber, isFunction } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { isComponentFormSchema, generatePlaceholder } from '../helper'
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
    const { isRender = true, isShow = true } = props.schema

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
      console.log('width', width)

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
      if (!isComponentFormSchema(props.schema)) return null

      const { component, renderComponentContent, field, changeEvent = 'change', valueField } = props.schema
      const { size = 'default' } = props.formProps

      const isCheck = component && ['Radio', 'Checkbox', 'Switch'].includes(component)

      const eventKey = `on${upperFirst(changeEvent)}`

      const propsData: Recordable<any> = {
        size,
        allowClear: true,
        ...unref(getComponentsProps),
        disabled: unref(getDisabled),
        readonly: unref(getReadonly)
      }

      if (!propsData.disabled && component !== 'RangePicker' && component) {
        propsData.placeholder = unref(getComponentsProps)?.placeholder || generatePlaceholder(component)
      }
      propsData.codeField = field
      propsData.formValues = unref(getValues)

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

      if (!renderComponentContent) {
        return <Compo {...compoAttr} />
      }

      const compoSlot = isFunction(renderComponentContent)
        ? {
            ...renderComponentContent(unref(getValues), {
              disabled: unref(getDisabled),
              readonly: unref(getReadonly)
            })
          }
        : {
            default: () => renderComponentContent
          }

      return <Compo {...compoAttr}>{compoSlot}</Compo>
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
            {showSuffixCont && <span class='suffix-cont'>{getSuffixCont}</span>}
          </div>
        </Form.Item>
      )
    }

    return () => {
      const { colProps = {}, colSlot, renderColContent, component, slot } = props.schema

      if (!((component && compoMap.has(component)) || slot)) {
        return null
      }

      const { colProps: globalColProps = {} } = props.formProps
      const realColProps = { ...globalColProps, ...colProps }

      const values = unref(getValues)
      const options = { disabled: unref(getDisabled), readonly: unref(getReadonly) }

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values, options)
          : renderColContent
            ? renderColContent(values, options)
            : renderFormItem
      }

      return (
        unref(itemIsRender) && (
          <Col {...realColProps} v-show={unref(itemIsShow)}>
            {getContent()}
          </Col>
        )
      )
    }
  }
})
