import { defineComponent } from 'vue'
// import dayjs from 'dayjs'
import { Button as AntdButton, Table as AntdTable, Select as AntdSelect, Switch as AntdSwitch, InputNumber as AntdInputNumber,
  Input as AntdInput, DatePicker as AntdDatePicker, RadioGroup as AntdRadioGroup, CheckboxGroup as AntdCheckboxGroup,
  Card as AntdCard } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table'
import { PageWrapper } from '@/components/Page'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { tableData } from '../excel/export-excel/data'

export default defineComponent({
  name: 'TableEditRow',
  setup() {
    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'key', align: 'center' },
      { title: '姓名', dataIndex: 'name', align: 'center' },
      { title: '性别', dataIndex: 'sex', align: 'center' },
      { title: '生日', dataIndex: 'birth', align: 'center' },
      { title: '学历', dataIndex: 'education', align: 'center' },
      { title: '爱好', dataIndex: 'hobby', align: 'center' },
      { title: '禁止编辑', dataIndex: 'forbid', align: 'center' },
      { title: '操作', key: 'action', align: 'center' }
    ]
    
    function openGithub() {
      openWindow(TABLE_PLUGIN_URL)
    }

    function handleEdit(record: Recordable) {
      record.editable = !record.editable
    }

    return () => (
      <PageWrapper name='Table 表格(可编辑行)'>
        {{
          header: () => <>
            <p>ant-design-table: 使用 ant-design 的 table 组件, 可用于展示多条结构类似的数据, 并对其进行行数据编辑操作。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdCard bordered={false}>
            <AntdTable
              dataSource={tableData}
              columns={tableColumns}
              pagination={false}
            >
              {{
                  bodyCell: ({column, record}) => {
                    if (column.dataIndex === 'key') {
                      return record.editable
                        ? <AntdInputNumber v-model:value={record.key} min={1000} max={2000} />
                        : <span>{record.key}</span>
                    }
                    else if (column.dataIndex === 'name') {
                      return record.editable
                        ? <AntdInput v-model:value={record.name} />
                        : <span>{record.name}</span>
                    }
                    else if (column.dataIndex === 'sex') {
                      return record.editable
                        ? <AntdRadioGroup v-model:value={record.sex} options={['男', '女'].map(item => ({value: item, label: item}))} />
                        : <span>{record.sex}</span>
                    }
                    // else if (column.dataIndex === 'birth') {
                    //   return <AntdDatePicker v-model:value={record.birth} />
                    // }
                    else if (column.dataIndex === 'education') {
                      return record.editable
                        ? <AntdSelect
                            v-model:value={record.education}
                            options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))}
                            style='width: 100px'
                          />
                        : <span>{record.education}</span>
                    }
                    // else if (column.dataIndex === 'hobby') {
                    //   return <AntdCheckboxGroup v-model:value={record.hobby} options={[]} />
                    // }
                    else if (column.dataIndex === 'forbid') {
                      return record.editable
                        ? <AntdSwitch v-model:checked={record.forbid} />
                        : <span>{record.forbid ? '是' : '否'}</span>
                    }
                    else if (column.key === 'action') {
                      return <AntdButton
                        type={record.editable ? 'primary' : 'default'}
                        disabled={record.forbid}
                        onClick={handleEdit.bind(null, record)}
                      >
                        {record.editable ? '保存' : '编辑'}
                      </AntdButton>
                    }
                  }
              }}
            </AntdTable>
          </AntdCard>
        }}
      </PageWrapper>
    )
  }
})