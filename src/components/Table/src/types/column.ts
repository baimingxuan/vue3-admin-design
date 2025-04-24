import type { Rule } from 'ant-design-vue/lib/form/interface'
import type { ComponentProps, ComponentType } from './'

export interface EditColumnType {
  editComponent?: ComponentType
  editRule?: Rule[]
  editComponentProps?: ComponentProps
  editRow?: boolean
  editable?: boolean
}
