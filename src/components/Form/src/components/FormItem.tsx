import type { PropType } from 'vue'
import type { Rule as ValidationRule } from 'ant-design-vue/lib/form'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { defineComponent, unref, computed } from 'vue'
import { Col, Form } from 'ant-design-vue'
import { upperFirst, cloneDeep } from 'lodash-es'
import { isNumber, isFunction, isNull, isBoolean } from '@/utils/is'
import { getSlot } from '@/utils/helper/tsxHelper'
import { isComponentFormSchema, generatePlaceholder, setComponentRuleType } from '../helper'
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
      type: Function as PropType<(key: string, value: any, schema: FormSchemaType) => void>,
      default: null
    },
    formDefaultVal: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    isAdvanced: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props, { slots }) {
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
      const { disabled: itemDisabled = false } = unref(getComponentsProps)
      const { disabled: dynamicDisabled } = props.schema

      let disabled = !!globDisabled || itemDisabled

      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      } else if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }

      return disabled
    })

    const getReadonly = computed(() => {
      const { readonly: globReadonly } = props.formProps
      const { readonly: itemReadonly = false } = unref(getComponentsProps)
      const { readonly: dynamicReadonly } = props.schema

      let readonly = !!globReadonly || itemReadonly

      if (isBoolean(dynamicReadonly)) {
        readonly = dynamicReadonly
      } else if (isFunction(dynamicReadonly)) {
        readonly = dynamicReadonly(unref(getValues))
      }

      return readonly
    })

    function getShow(): { itemIsShow: boolean; itemIsRender: boolean } {
      const { isShow, isRender } = props.schema
      const { showAdvancedBtn } = props.formProps

      const itemIsAdvanced = showAdvancedBtn ? props.isAdvanced : true

      const itemIsShow =
        (isFunction(isShow) ? isShow(unref(getValues)) : isBoolean(isShow) ? isShow : true) && itemIsAdvanced
      const itemIsRender = isFunction(isRender) ? isRender(unref(getValues)) : isBoolean(isRender) ? isRender : true

      return {
        itemIsShow,
        itemIsRender
      }
    }

    function handleRules(): ValidationRule[] {
      const { label, required, rules: defRules = [], component, rulesMessageJoinLabel } = props.schema

      if (isFunction(defRules)) {
        return defRules(unref(getValues)) as ValidationRule[]
      }

      let rules: ValidationRule[] = cloneDeep(defRules) as ValidationRule[]
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const assertLabel = joinLabel ? label : ''
      const defaultMsg = component ? generatePlaceholder(component) + assertLabel : assertLabel

      function validator(rule: any, value: any) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          return Promise.reject(msg)
        } else if (Array.isArray(value) && value.length === 0) {
          return Promise.reject(msg)
        } else if (typeof value === 'string' && value.trim() === '') {
          return Promise.reject(msg)
        } else if (
          typeof value === 'object' &&
          Reflect.has(value, 'checked') &&
          Reflect.has(value, 'halfChecked') &&
          Array.isArray(value.checked) &&
          Array.isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ) {
          return Promise.reject(msg)
        }
        return Promise.resolve()
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      if (getRequired) {
        if (!rules || rules.length === 0) {
          const trigger = component === 'Input' ? 'blur' : 'change'
          rules = [{ required: getRequired, validator, trigger }]
        } else {
          const requiredIndex: number = rules.findIndex(rule => Reflect.has(rule, 'required'))

          if (requiredIndex < 0) {
            rules.push({ required: getRequired, validator })
          }
        }
      }

      const requiredRuleIndex: number = rules.findIndex(
        rule => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      )

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex]
        const { itemIsShow } = getShow()
        if (!itemIsShow) {
          rule.required = false
        }
        if (component) {
          rule.message = rule.message || defaultMsg

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true
          }
          const valueFormat = unref(getComponentsProps)?.valueFormat
          setComponentRuleType(rule, component, valueFormat)
        }
      }

      const characterInx = rules.findIndex(val => val.max)
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message = rules[characterInx].message || `字符数应小于${rules[characterInx].max}位`
      }

      return rules
    }

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

          props.setFormModel(field, value, props.schema)
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
      const { field, label, itemProps, slot, renderComponent: renderCompo, suffixContent } = props.schema
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
          class={{ 'suffix-item': showSuffixCont }}
          {...(itemProps as Recordable<any>)}
          rules={handleRules()}
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
      const { itemIsShow, itemIsRender } = getShow()
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
        itemIsRender && (
          <Col {...realColProps} v-show={unref(itemIsShow)}>
            {getContent()}
          </Col>
        )
      )
    }
  }
})
