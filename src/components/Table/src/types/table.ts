import type { ColumnProps } from 'ant-design-vue/lib/table'
import type { Rule } from 'ant-design-vue/lib/form/interface'
import type { ComponentProps, ComponentType } from './'

export interface EditColumnType extends ColumnProps<Recordable> {
  // Editable
  edit?: boolean
  editable?: boolean
  editRow?: boolean
  editComponent?: ComponentType
  editComponentProps?:
    | ((opt: {
        text: string | number | boolean | Recordable
        record: Recordable
        column: EditColumnType
        index: number
      }) => ComponentProps)
    | ComponentProps
  editRule?: Rule[]
  editValueMap?: (value: any) => string
  dynamicDisabled?: boolean | ((record: Recordable) => boolean)
}
