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
    label: '出生日期',
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
  },
  {
    field: 'sex',
    label: '性别',
    rules: [
      {
        required: true,
        message: '请选择性别'
      }
    ],
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ]
    }
  },
  {
    field: 'age',
    label: '年龄',
    rules: [
      {
        required: true,
        message: '请输入年龄'
      }
    ],
    component: 'Input'
  },
  {
    field: 'education',
    label: '学历',
    rules: [
      {
        required: true,
        message: '请输入学历'
      }
    ],
    component: 'Input'
  },
  {
    field: 'date',
    label: '毕业时间',
    rules: [
      {
        required: true,
        message: '请选择毕业时间'
      }
    ],
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'school',
    label: '毕业学校',
    rules: [
      {
        required: true,
        message: '请输入学校'
      }
    ],
    component: 'Input'
  }
]
