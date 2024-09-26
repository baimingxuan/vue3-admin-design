import type { Component, VNodeProps } from 'vue'

type ExtractPropTypes<T extends Component> = T extends new (...args: any[]) => any
  ? Omit<InstanceType<T>['$props'], keyof VNodeProps>
  : never

export interface ComponentProps {
  Input: ExtractPropTypes<(typeof import('ant-design-vue/es/input'))['default']>
  InputNumber: ExtractPropTypes<(typeof import('ant-design-vue/es/input-number'))['default']>
  Select: ExtractPropTypes<(typeof import('ant-design-vue/es/select'))['default']>
  DatePicker: ExtractPropTypes<(typeof import('ant-design-vue/es/date-picker'))['default']>
  Checkbox: ExtractPropTypes<(typeof import('ant-design-vue/es/checkbox'))['default']>
  Cascader: ExtractPropTypes<(typeof import('ant-design-vue/es/cascader'))['default']>
  RadioGroup: ExtractPropTypes<(typeof import('ant-design-vue/es/radio'))['RadioGroup']>
  Switch: ExtractPropTypes<(typeof import('ant-design-vue/es/switch'))['default']>
  TreeSelect: ExtractPropTypes<(typeof import('ant-design-vue/es/tree-select'))['default']>
}

export type ComponentType = keyof ComponentProps
