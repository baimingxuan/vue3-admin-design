import type { Rule as ValidationRule } from 'ant-design-vue/lib/form'
import type { ComponentType } from './types'
import type { FormSchemaInnerType, SlotFormSchemaType, ComponentFormSchemaType } from './types/form'
import { set } from 'lodash-es'
import { isObject, isNumber } from '@/utils/is'
import { DEFAULT_VALUE_COMPONENTS } from './constant'

export function isSlotFormSchema(schema: FormSchemaInnerType): schema is SlotFormSchemaType {
  return 'slot' in schema
}

export function isComponentFormSchema(schema: FormSchemaInnerType): schema is ComponentFormSchemaType {
  return !isSlotFormSchema(schema)
}

export function generatePlaceholder(component: ComponentType) {
  if (
    component.includes('Select') ||
    component.includes('Picker') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    return '请选择'
  } else if (component.includes('Input')) {
    return '请输入'
  } else {
    return ''
  }
}

export function setComponentRuleType(rule: ValidationRule, component: ComponentType, valueFormat: string) {
  if (Reflect.has(rule, 'type')) {
    return
  }
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = valueFormat ? 'string' : 'object'
  } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
    rule.type = 'array'
  } else if (['InputNumber'].includes(component)) {
    rule.type = 'number'
  }
}

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val
  if (DEFAULT_VALUE_COMPONENTS.includes(component)) {
    return val && isNumber(val) ? `${val}` : val
  }
  return val
}

export function tryConstructObject(field: string, values: Recordable = {}): Recordable | undefined {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length) {
        return
      }

      const result = {}
      keys.forEach(k => {
        set(result, k.trim(), values[k.trim()])
      })

      return Object.values(result).filter(Boolean).length ? result : undefined
    }
  }
}

/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
export function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = isObject(value) ? value : {}
      keys.forEach(k => {
        set(target, k.trim(), value[k.trim()])
      })
      return true
    }
  }
}

export function tryConstructArray(field: string, values: Recordable = {}): any[] | undefined {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length) {
        return undefined
      }

      const result = []
      keys.forEach((k, index) => {
        set(result, index, values[k.trim()])
      })

      return result.filter(Boolean).length ? result : undefined
    }
  }
}

/**
 * @desription deconstruct array-link key. This method will mutate the target.
 */
export function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = Array.isArray(value) ? value : [value]
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index])
      })
      return true
    }
  }
}
