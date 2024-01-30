import { defineComponent, reactive, ref, unref } from 'vue'
import { Form, FormItem, Button, Card, Input, RadioGroup, Select, Table, Space, message } from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/lib/table'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN } from '@/settings/websiteSetting'
import { useExcel } from '../useExcel'
import type { DataToSheet } from '../types'
import { tableData } from './data'

type FileType = 'xlsx' | 'csv' | 'txt'

interface FormState {
  fileName: string
  autoWidth: boolean
  fileType: FileType
}

export default defineComponent({
  name: 'ExportExcel',
  setup() {
    const formParam = reactive<FormState>({
      fileName: '',
      autoWidth: true,
      fileType: 'xlsx'
    })

    const { exportDataToExcel } = useExcel()

    const dataSource = ref(tableData)
    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'key', align: 'center' },
      { title: '姓名', dataIndex: 'name', align: 'center' },
      { title: '性别', dataIndex: 'sex', align: 'center' },
      { title: '手机', dataIndex: 'phone', align: 'center' },
      { title: '学历', dataIndex: 'education', align: 'center' },
      { title: '爱好', dataIndex: 'hobby', align: 'center' }
    ]

    const tableSelectedKeys = ref<number[]>([])
    const tableSelectedRows = ref<object[]>([])

    function handleTableChange(selectedKeys: number[]) {
      tableSelectedKeys.value = selectedKeys
    }

    function handleTableSelect(_record: object, _selected: boolean, selectedRows: object[]) {
      tableSelectedRows.value = selectedRows
    }

    function handleTableSelectAll(_selected: boolean, selectedRows: object[]) {
      tableSelectedRows.value = selectedRows
    }

    function handleExport() {
      if (!unref(tableSelectedRows).length) {
        message.warning('请勾选要导出的数据项！')
        return
      }

      const params: DataToSheet = {
        data: unref(tableSelectedRows),
        header: ['编号', '姓名', '性别', '手机', '学历', '爱好'],
        key: ['key', 'name', 'sex', 'phone', 'education', 'hobby'],
        fileName: formParam.fileName,
        autoWidth: formParam.autoWidth,
        bookType: formParam.fileType
      }
      exportDataToExcel(params)
      tableSelectedKeys.value = []
      tableSelectedRows.value = []
    }

    return () => (
      <PageWrapper plugin={XLSX_PLUGIN}>
        <Card>
          <Space direction='vertical' size={16} style={{ width: '100%' }}>
            <Form model={formParam} layout='inline'>
              <FormItem label='文件名:' name='fileName'>
                <Input v-model:value={formParam.fileName} placeholder='文件名' />
              </FormItem>
              <FormItem label='自动宽度:' name='autoWidth'>
                <RadioGroup
                  v-model:value={formParam.autoWidth}
                  options={[
                    { label: '自动', value: true },
                    { label: '固定', value: false }
                  ]}
                />
              </FormItem>
              <FormItem label='文件类型:' name='fileType'>
                <Select
                  v-model:value={formParam.fileType}
                  options={[
                    { label: 'xlsx', value: 'xlsx' },
                    { label: 'csv', value: 'csv' },
                    { label: 'txt', value: 'txt' }
                  ]}
                  style={{ width: '180px' }}
                />
              </FormItem>
              <FormItem>
                <Button type='primary' htmlType='submit' onClick={handleExport}>
                  导出Excel
                </Button>
              </FormItem>
            </Form>
            <Table
              dataSource={unref(dataSource)}
              columns={tableColumns}
              rowSelection={{
                selectedRowKeys: unref(tableSelectedKeys),
                onChange: handleTableChange,
                onSelect: handleTableSelect,
                onSelectAll: handleTableSelectAll
              }}
              pagination={false}
            />
          </Space>
        </Card>
      </PageWrapper>
    )
  }
})
