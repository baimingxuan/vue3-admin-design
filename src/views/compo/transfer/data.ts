import type { TransferProps } from 'ant-design-vue'

interface MockData {
  key: string
  title: string
}

const mockData: MockData[] = []
for (let i = 1; i < 10; i++) {
  mockData.push({
    key: i.toString(),
    title: `备选项 ${i}`
  })
}

const treeData: TransferProps['dataSource'] = [
  { key: '1', title: '备选项 1' },
  {
    key: '2',
    title: '备选项 2',
    children: [
      { key: '2-1', title: '备选项 2-1' },
      { key: '2-2', title: '备选项 2-2' },
      { key: '2-3', title: '备选项 2-3' }
    ]
  },
  { key: '3', title: '备选项 3-1' },
  {
    key: '4',
    title: '备选项 4',
    children: [
      { key: '4-1', title: '备选项 4-1' },
      {
        key: '4-2',
        title: '备选项 4-2',
        children: [{ key: '4-2-1', title: '备选项 4-2-1' }]
      },
      { key: '4-3', title: '备选项 4-3' }
    ]
  }
]

const transferDataSource: TransferProps['dataSource'] = []
function flatten(list: TransferProps['dataSource'] = []) {
  list.forEach(item => {
    transferDataSource?.push(item)
    flatten(item.children)
  })
}
flatten(JSON.parse(JSON.stringify(treeData)))

export { mockData, treeData, transferDataSource }
