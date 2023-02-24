import { TableProps, ColumnType, TablePaginationConfig } from 'ant-design-vue/lib/table'
import { defineComponent, createVNode, ref, unref, computed, reactive, onMounted } from 'vue'
import { Button, Table, Tag, Select, Switch, Popover, Space, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { TABLE_COMPO } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { PageWrapper } from '@/components/Page'

interface APIResult {
  list: any[],
  total: number
}

const marriedOptions = [
  { label: '单身', value: 0 },
  { label: '未婚', value: 1 },
  { label: '已婚', value: 2 },
  { label: '离异', value: 3 }
]

export default defineComponent({
  name: 'TableBasic',
  setup() {
    const tableLoading = ref(false)
    const tableData = ref<any[]>([])
    const tableTotal = ref<number>(0)
    const tableQuery = reactive({
      current: 1,
      pageSize: 10
    })

    const tableSelection: TableProps['rowSelection'] = {
      onChange: (selectedRowKeys: string[]) => {
        console.log(selectedRowKeys)
      }
    }

    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'id', sorter: true, align: 'center' },
      { title: '姓名', dataIndex: 'name', align: 'center' },
      { title: '性别', dataIndex: 'sex', align: 'center' },
      { title: '手机', dataIndex: 'phone', align: 'center' },
      { title: '学历', dataIndex: 'education', align: 'center' },
      { title: '婚姻状况', dataIndex: 'married', align: 'center' },
      { title: '禁止编辑', dataIndex: 'forbid', align: 'center' },
      { title: '爱好', dataIndex: 'hobby', align: 'center' },
      { title: '操作', key: 'action', align: 'center' }
    ]

    const tablePagination = computed(() => ({
      total: unref(tableTotal),
      current: tableQuery.current,
      pageSize: tableQuery.pageSize
    })) as TablePaginationConfig

    onMounted(() => {
      fetchData()
    })

    async function fetchData() {
      tableLoading.value = true
      const data = await getTableList(tableQuery)
      const { list, total } = data as unknown as APIResult
      tableData.value = list
      tableTotal.value = total
      tableLoading.value = false
      console.log('tableData', data)
    }

    function handleTableChange(pagination: TablePaginationConfig) {
      const { current = 1, pageSize = 10 } = pagination
      tableQuery.current = current
      tableQuery.pageSize = pageSize
      console.log('pagination', pagination)
      // fetchData()
    }

    function handleDelete() {
      Modal.confirm({
        title: '此操作将删除选中数据, 是否继续?',
        icon: createVNode(ExclamationCircleOutlined),
        // okType: 'danger',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }

    return () => (
      <PageWrapper plugin={TABLE_COMPO}>
        {{
          default: () => <div>
            <Table
              rowSelection={tableSelection}
              columns={tableColumns}
              dataSource={unref(tableData)}
              pagination={tablePagination}
              loading={unref(tableLoading)}
              onChange={handleTableChange}
            >
              {{
                  bodyCell: ({column, record}) => {
                    if (column.dataIndex === 'name') {
                      const slots = {
                        content: () => <>
                          <p>姓名: {record.name}</p>
                          <p>手机: {record.phone}</p>
                          <p>爱好: {record.hobby.join('、')}</p>
                        </>
                      }
                      return <Popover v-slots={slots}>
                        <Tag color='blue'>{record.name}</Tag>
                      </Popover>
                    }
                    else if (column.dataIndex === 'married') {
                      return <Select v-model={[record.married, 'value']} options={marriedOptions} />
                    }
                    else if (column.dataIndex === 'hobby') {
                      return <span>{record.hobby.join('、')}</span>
                    }
                    else if (column.dataIndex === 'forbid') {
                      return <Switch v-model={[record.forbid, 'checked']} />
                    }
                    else if (column.key === 'action') {
                      return <Space>
                        <Button disabled={record.forbid}>编辑</Button>
                        <Button danger onClick={handleDelete}>删除</Button>
                      </Space>
                    }
                  }
              }}
            </Table>
          </div>
        }}
      </PageWrapper>
    )
  }
})