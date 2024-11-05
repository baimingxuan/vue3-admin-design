import type { Component, VNodeProps, ComputedRef, Ref } from 'vue'

type MethodsNameToCamelCase<T extends string, M extends string = ''> = T extends `${infer F}-${infer N}${infer Tail}`
  ? MethodsNameToCamelCase<Tail, `${M}${F}${Uppercase<N>}`>
  : `${M}${T}`

type MethodsNameTransform<T> = {
  [K in keyof T as K extends `on${string}` ? MethodsNameToCamelCase<K> : never]: T[K]
}

type ExtractPropTypes<T extends Component> = T extends new (...args: any[]) => any
  ? Omit<InstanceType<T>['$props'], keyof VNodeProps>
  : never

interface _CustomComponents {
  ApiCascader: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiCascader'))['default']>
  ApiCheckboxGroup: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiCheckboxGroup'))['default']>
  ApiRadioGroup: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiRadioGroup'))['default']>
  ApiSelect: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiSelect'))['default']>
  ApiTransfer: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiTransfer'))['default']>
  ApiTree: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiTree'))['default']>
  ApiTreeSelect: ExtractPropTypes<(typeof import('../../../ApiCompo/src/components/ApiTreeSelect'))['default']>
}

type CustomComponents<T = _CustomComponents> = {
  [K in keyof T]: T[K] & MethodsNameTransform<T[K]>
}

export interface ComponentProps {
  Input: ExtractPropTypes<(typeof import('ant-design-vue/es/input'))['default']>
  InputNumber: ExtractPropTypes<(typeof import('ant-design-vue/es/input-number'))['default']>
  Select: ExtractPropTypes<(typeof import('ant-design-vue/es/select'))['default']>
  DatePicker: ExtractPropTypes<(typeof import('ant-design-vue/es/date-picker'))['default']>
  ApiSelect: CustomComponents['ApiSelect'] & ComponentProps['Select']
  Checkbox: ExtractPropTypes<(typeof import('ant-design-vue/es/checkbox'))['default']>
  ApiCheckboxGroup: CustomComponents['ApiCheckboxGroup'] & ComponentProps['Checkbox']
  Cascader: ExtractPropTypes<(typeof import('ant-design-vue/es/cascader'))['default']>
  ApiCascader: CustomComponents['ApiCascader'] & ComponentProps['Cascader']
  RadioGroup: ExtractPropTypes<(typeof import('ant-design-vue/es/radio'))['RadioGroup']>
  ApiRadioGroup: CustomComponents['ApiRadioGroup'] & ComponentProps['RadioGroup']
  Switch: ExtractPropTypes<(typeof import('ant-design-vue/es/switch'))['default']>
  Transfer: ExtractPropTypes<(typeof import('ant-design-vue/es/transfer'))['default']>
  ApiTransfer: CustomComponents['ApiTransfer'] & ComponentProps['Transfer']
  Tree: ExtractPropTypes<(typeof import('ant-design-vue/es/tree'))['default']>
  ApiTree: CustomComponents['ApiTree'] & ComponentProps['Tree']
  TreeSelect: ExtractPropTypes<(typeof import('ant-design-vue/es/tree-select'))['default']>
  ApiTreeSelect: CustomComponents['ApiTreeSelect'] & ComponentProps['TreeSelect']
}

export type ComponentType = keyof ComponentProps

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
