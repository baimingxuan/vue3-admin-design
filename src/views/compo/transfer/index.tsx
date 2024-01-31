import type { TransferProps, TreeProps } from 'ant-design-vue'
import { defineComponent, ref, computed } from 'vue'
import { Row, Col, Card, Transfer, Table, Tree } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { TRANSFER_COMPO } from '@/settings/websiteSetting'
import { mockData, treeData, transferDataSource } from './data'

type tableColumn = Record<string, string>

const tableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  }
]

export default defineComponent({
  name: 'TransferPage',
  setup() {
    const targetKeys = ref<string[]>(['1', '5'])
    const selectedKeys = ref<string[]>(['2', '6'])

    const treeTargetKeys = ref<string[]>([])
    const dataSource = ref(transferDataSource)

    const columns = ref<tableColumn[]>(tableColumns)

    const newTreeData = computed(() => {
      return handleTreeData(treeData, treeTargetKeys.value)
    })

    function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
      return selectedKeys.indexOf(eventKey) !== -1
    }

    function handleTreeData(data: TransferProps['dataSource'] = [], targetKeys: string[] = []) {
      data.forEach(item => {
        item['disabled'] = targetKeys.includes(item.key as any)
        if (item.children) {
          handleTreeData(item.children, targetKeys)
        }
      })
      return data as TreeProps['treeData']
    }

    function onChecked(e: any, checkedKeys: string[], onItemSelect: (n: any, c: boolean) => void) {
      const { eventKey } = e.node
      onItemSelect(eventKey, !isChecked(checkedKeys, eventKey as string))
    }

    function getRowSelection({ selectedKeys, onItemSelectAll, onItemSelect }: Record<string, any>) {
      return {
        onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
          const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key)
          onItemSelectAll(treeSelectedKeys, selected)
        },
        onSelect({ key }: Record<string, string>, selected: boolean) {
          onItemSelect(key, selected)
        },
        selectedRowKeys: selectedKeys
      }
    }

    return () => (
      <PageWrapper plugin={TRANSFER_COMPO}>
        <Row gutter={12}>
          <Col span={8}>
            <Card title='基础用法' bodyStyle={{ height: '420px' }}>
              <Transfer
                v-model:targetKeys={targetKeys.value}
                v-model:selectedKeys={selectedKeys.value}
                dataSource={mockData}
                render={item => item.title}
                listStyle={{ width: '230px', height: '360px' }}
                locale={{ itemsUnit: '项 ' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title='树穿梭框' bodyStyle={{ height: '420px' }}>
              <Transfer
                v-model:targetKeys={treeTargetKeys.value}
                dataSource={dataSource.value}
                render={item => item.title}
                showSelectAll={false}
                listStyle={{ width: '230px', height: '360px' }}
              >
                {{
                  children: ({ direction, selectedKeys, onItemSelect }) =>
                    direction === 'left' ? (
                      <Tree
                        blockNode
                        checkable
                        checkStrictly
                        defaultExpandAll
                        checkedKeys={[...selectedKeys, ...treeTargetKeys.value]}
                        treeData={newTreeData.value}
                        onCheck={(_, props) => {
                          onChecked(props, [...selectedKeys, ...treeTargetKeys.value], onItemSelect)
                        }}
                        onSelect={(_, props) => {
                          onChecked(props, [...selectedKeys, ...treeTargetKeys.value], onItemSelect)
                        }}
                      />
                    ) : null
                }}
              </Transfer>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='表格穿梭框' bodyStyle={{ height: '420px' }}>
              <Transfer
                v-model:targetKeys={targetKeys.value}
                dataSource={mockData}
                listStyle={{ width: '230px', height: '360px' }}
                locale={{ itemsUnit: '项 ' }}
              >
                {{
                  children: ({ filteredItems, selectedKeys, onItemSelectAll, onItemSelect }) => (
                    <Table
                      rowSelection={getRowSelection({ selectedKeys, onItemSelectAll, onItemSelect })}
                      columns={columns.value}
                      dataSource={filteredItems}
                      size='small'
                      pagination={false}
                      customRow={({ key }) => ({
                        onClick: () => {
                          onItemSelect(key, !selectedKeys.includes(key))
                        }
                      })}
                    />
                  )
                }}
              </Transfer>
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})
