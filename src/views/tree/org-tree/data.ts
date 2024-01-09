export const data = {
  id: 1,
  label: 'XXX科技有限公司',
  children: [
    {
      id: 2,
      pid: 1,
      label: '产品研发部',
      children: [
        {
          id: 5,
          pid: 2,
          label: '产品经理'
        },
        {
          id: 6,
          pid: 2,
          label: 'UI设计'
        },
        {
          id: 9,
          pid: 2,
          label: '研发-前端'
        },
        {
          id: 10,
          pid: 2,
          label: '研发-后端'
        },
        {
          id: 12,
          pid: 2,
          label: '测试'
        }
      ]
    },
    {
      id: 3,
      pid: 1,
      label: '销售部',
      children: [
        {
          id: 7,
          pid: 3,
          label: '销售一部',
          children: [
            {
              id: 14,
              pid: 7,
              label: '售前'
            },
            {
              id: 15,
              pid: 7,
              label: '售后'
            },
            {
              id: 16,
              pid: 7,
              label: '客服'
            }
          ]
        },
        {
          id: 8,
          pid: 3,
          label: '销售二部'
        },
        {
          id: 13,
          pid: 3,
          label: '销售三部'
        }
      ]
    },
    {
      id: 4,
      pid: 1,
      label: '财务部'
    },
    {
      id: 11,
      pid: 1,
      label: 'HR人事'
    }
  ]
}
