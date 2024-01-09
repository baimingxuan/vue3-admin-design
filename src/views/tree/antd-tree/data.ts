export const treeData = [
  {
    key: '1-0',
    title: '一级 1',
    children: [
      {
        key: '1-1',
        title: '二级 1-1',
        children: [
          {
            key: '1-1-1',
            title: '三级 1-1-1'
          },
          {
            key: '1-1-2',
            title: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    key: '2-0',
    title: '一级 2',
    children: [
      {
        key: '2-1',
        title: '二级 2-1'
      },
      {
        key: '2-2',
        title: '二级 2-2',
        disabled: true
      }
    ]
  },
  {
    key: '3-0',
    title: '一级 3',
    children: [
      {
        key: '3-1',
        title: '二级 3-1'
      },
      {
        key: '3-2',
        title: '二级 3-2',
        children: [
          {
            key: '3-2-1',
            title: '三级 3-2-1',
            disableCheckbox: true
          },
          {
            key: '3-2-2',
            title: '三级 3-2-2'
          },
          {
            key: '3-2-3',
            title: '三级 3-2-3'
          }
        ]
      }
    ]
  }
]
