import { ColumnType, TablePaginationConfig } from 'ant-design-vue/lib/table'
import { defineComponent, ref, computed } from 'vue'
import { Button as AntdButton, Table as AntdTable } from 'ant-design-vue'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { PageWrapper } from '@/components/Page'

export default defineComponent({
  name: 'Markdown',
  setup() {
    const tableLoading = ref(false)

    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'id', sorter: true, width: '120', align: 'center' },
      { title: '性别', dataIndex: 'sex', align: 'center' },
      { title: '手机', dataIndex: 'phone', align: 'center' },
      { title: '学历', dataIndex: 'education', align: 'center' },
    ]

    const tablePagination = computed(() => ({
      total: 100,
      current: 1,
      pageSize: 10
    })) as TablePaginationConfig

    function handleTableChange() {}

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
              columns={tableColumns}
              pagination={tablePagination}
              loading={tableLoading.value}
              onChange={handleTableChange}
            />
          </div>
        }}
      </PageWrapper>
    )
  }
})