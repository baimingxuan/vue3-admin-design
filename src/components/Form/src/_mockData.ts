import type { FormSchemaType } from './types'

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
    component: 'input'
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
    component: 'select',
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
    component: 'datePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'name',
    label: '名称',
    rules: [
      {
        required: true,
        message: '请输入名称'
      }
    ],
    component: 'input'
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
    component: 'select',
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
    component: 'datePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'name',
    label: '名称',
    rules: [
      {
        required: true,
        message: '请输入名称'
      }
    ],
    component: 'input'
  },
  {
    field: 'name',
    label: '名称',
    rules: [
      {
        required: true,
        message: '请输入名称'
      }
    ],
    component: 'input'
  }
]
