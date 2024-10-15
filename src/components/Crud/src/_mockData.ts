import type { FormSchemaType } from '../../Form/src/types/form'

export const formSchemas: FormSchemaType[] = [
  {
    field: 'name',
    label: '名称',
    rules: [
      {
        required: true,
        message: '请输入名称'
      }
    ],
    component: 'Input'
  },
  {
    field: 'status',
    label: '状态',
    rules: [
      {
        required: true,
        message: '请选择状态'
      }
    ],
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  },
  {
    field: 'date',
    label: '日期时间',
    rules: [
      {
        required: true,
        message: '请选择日期时间'
      }
    ],
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  }
]
