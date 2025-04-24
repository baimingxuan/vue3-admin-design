export function generatePlaceholder(component: any) {
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
