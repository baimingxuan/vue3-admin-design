import type { ComponentType } from './types'
import type { FormSchemaInnerType, SlotFormSchemaType, ComponentFormSchemaType } from './types/form'

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
