import { TableProps, ColumnType, TablePaginationConfig } from 'ant-design-vue/lib/table'
import { defineComponent, ref, computed, reactive, onMounted } from 'vue'
import { Button as AntdButton, Table as AntdTable } from 'ant-design-vue'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const tableLoading = ref(false)
    const tableQuery = reactive({
      currentPage: 1,
      pageSize: 10
    })

    const tableSelection: TableProps['rowSelection'] = {
      onChange: (selectedRowKeys: string[]) => {
        console.log(selectedRowKeys)
      }
    }

    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'id', sorter: true, width: '120', align: 'center' },
      { title: '性别', dataIndex: 'sex', align: 'center' },
      { title: '手机', dataIndex: 'phone', align: 'center' },
      { title: '学历', dataIndex: 'education', align: 'center' },
      { title: '婚姻状况', dataIndex: 'married', width: '100', align: 'center' },
    ]

    const tablePagination = computed(() => ({
      total: 100,
      current: 1,
      pageSize: 10
    })) as TablePaginationConfig

    onMounted(() => {
      fetchData()
    })

    async function fetchData() {
      tableLoading.value = true
      const data = await getTableList(tableQuery)
      console.log('tableData', data)
    }

    function handleTableChange() {
      
    }

    function openGithub() {
      openWindow(TABLE_PLUGIN_URL)
    }

    return () => (
      <PageWrapper name='Table 表格'>
        {{
          header: () => <>
            <p>ant-design-table: 使用 ant-design 的 table 组件, 可用于展示多条结构类似的数据, 并对其进行相关操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <div>
            <AntdTable
              rowSelection={tableSelection}
              columns={tableColumns}
              pagination={tablePagination}
              loading={tableLoading.value}
              onChange={handleTableChange}
            >
              {{ bodyCell: (column, record) => {
                if (column.key === '') {
                  return <a>{record.name}</a>
                }
              } }}
            </AntdTable>
          </div>
        }}
      </PageWrapper>
    )
  }
})