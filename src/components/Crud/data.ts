import type { formType } from './src/types/form'

export const formSchemas: formType = {
  name: {
    type: 'input',
    label: '名称',
    value: '',
    rules: [
      {
        required: true,
        message: '请输入名称'
      }
    ]
  },
  status: {
    type: 'select',
    label: '状态',
    value: '',
    rules: [
      {
        required: true,
        message: '请选择状态'
      }
    ],
    props: {
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
  startTime: {
    type: 'datePicker',
    label: '开始时间',
    value: '',
    rules: [
      {
        required: true,
        message: '请选择开始时间'
      }
    ],
    props: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  endTime: {
    type: 'datePicker',
    label: '结束时间',
    value: '',
    rules: [
      {
        required: true,
        message: '请选择结束时间'
      }
    ],
    props: {
      showTime: false,
      format: 'YYYY-MM-DD HH:mm:ss'
    }
  }
}
