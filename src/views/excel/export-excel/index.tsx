import { defineComponent, reactive, ref, unref } from 'vue'
import { Form as AntdForm, FormItem as AntdFormItem, Button as AntdButton, Card as AntdCard,
  Input as AntdInput, RadioGroup as AntdRadioGroup, Select as AntdSelect, Table as AntdTable,
  Space as AntdSpace, message } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { useExcel } from '../useExcel'
import { DataToSheet } from '../types'
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

    function handleTableSelect(
      _record: object,
      _selected: boolean,
      selectedRows: object[]
    ) {
      tableSelectedRows.value = selectedRows
    }

    function handleTableSelectAll(_selected: boolean, selectedRows: object[]) {
      tableSelectedRows.value = selectedRows
    }

    function openGithub() {
      openWindow(XLSX_PLUGIN_URL)
    }

    function handleExport() {
      if (!(unref(tableSelectedRows).length)) {
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
      <PageWrapper name='JS-xlsx插件'>
        {{
          header: () => <>
            <p>JS-xlsx: 由SheetJS出品的一款非常方便的只需要纯JS即可读取和导出excel的工具库, 功能强大, 支持xlsx、csv、txt等格式。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
            <AntdSpace direction='vertical' size={16} style={{width: '100%'}}>
              <AntdForm model={formParam} layout='inline'>
                <AntdFormItem label='文件名:' name='fileName'>
                  <AntdInput
                    v-model:value={formParam.fileName}
                    placeholder='文件名'
                  />
                </AntdFormItem>
                <AntdFormItem label='自动宽度:' name='autoWidth'>
                  <AntdRadioGroup
                    v-model:value={formParam.autoWidth}
                    options={[
                      { label: '自动', value: true },
                      { label: '固定', value: false }
                    ]}
                  />
                </AntdFormItem>
                <AntdFormItem label='文件类型:' name='fileType'>
                  <AntdSelect
                    v-model:value={formParam.fileType}
                    options={[
                      { label: 'xlsx', value: 'xlsx' },
                      { label: 'csv', value: 'csv' },
                      { label: 'txt', value: 'txt' }
                    ]}
                    style={{width: '180px'}}
                  />
                </AntdFormItem>
                <AntdFormItem>
                  <AntdButton type='primary' htmlType='submit' onClick={handleExport}>导出Excel</AntdButton>
                </AntdFormItem>
              </AntdForm>
              <AntdTable
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
            </AntdSpace>
          </AntdCard>
        }}
      </PageWrapper>
    )
  }
})