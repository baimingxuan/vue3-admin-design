import { defineComponent } from 'vue'
// import dayjs from 'dayjs'
import { Button as AntdButton, Table as AntdTable, Select as AntdSelect, Switch as AntdSwitch, InputNumber as AntdInputNumber,
  Input as AntdInput, DatePicker as AntdDatePicker, RadioGroup as AntdRadioGroup, CheckboxGroup as AntdCheckboxGroup,
  Card as AntdCard } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table'
import dayjs from 'dayjs'
import { PageWrapper } from '@/components/Page'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { tableData } from '../excel/export-excel/data'

export default defineComponent({
  name: 'TableEditRow',
  setup() {
    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'key', width: 70, align: 'center' },
      { title: '姓名', dataIndex: 'name', width: 110, align: 'center' },
      { title: '性别', dataIndex: 'sex', width: 120, align: 'center' },
      { title: '生日', dataIndex: 'birth', width: 140, align: 'center' },
      { title: '学历', dataIndex: 'education', width: 80, align: 'center' },
      { title: '爱好', dataIndex: 'hobby', width: 250, align: 'center' },
      { title: '禁止编辑', dataIndex: 'forbid', width: 70, align: 'center' },
      { title: '操作', key: 'action', width: 80, align: 'center' }
    ]
    
    function openGithub() {
      openWindow(TABLE_PLUGIN_URL)
    }

    function handlePickDate(record: Recordable, date: string) {
      record.birth = date
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
                  headerCell: ({column, title}) => {
                    if (column.dataIndex === 'key') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(数字输入框)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'name') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(输入框)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'sex') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(单选框)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'birth') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(日期选择框)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'education') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(选择器)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'hobby') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(多选框)</p>
                      </div>
                    }
                    else if (column.dataIndex === 'forbid') {
                      return <div>
                        <p>{title}</p>
                        <p class='sub-title'>(开关)</p>
                      </div>
                    }

                  },
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
                    else if (column.dataIndex === 'birth') {
                      return record.editable
                        ? <AntdDatePicker
                          value={dayjs(record.birth, 'YYYY-MM-DD')}
                          format='YYYY-MM-DD'
                          valueFormat='YYYY-MM-DD'
                          onChange={handlePickDate.bind(null, record)}
                        />
                        : <span>{record.birth}</span>
                    }
                    else if (column.dataIndex === 'education') {
                      return record.editable
                        ? <AntdSelect
                            v-model:value={record.education}
                            options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))}
                            style='width: 80px'
                          />
                        : <span>{record.education}</span>
                    }
                    else if (column.dataIndex === 'hobby') {
                      return record.editable
                        ? <AntdCheckboxGroup
                          v-model:value={record.hobby}
                          options={record.hobby.split('、').map(item => ({label: item, value: item}))}
                        />
                        : <span>{record.hobby}</span>
                    }
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