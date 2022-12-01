import type { UnwrapRef } from 'vue'
import { defineComponent, ref, unref, reactive } from 'vue'
import { Button as AntdButton, Table as AntdTable, Select as AntdSelect, Switch as AntdSwitch, InputNumber as AntdInputNumber,
  Input as AntdInput, DatePicker as AntdDatePicker, RadioGroup as AntdRadioGroup, CheckboxGroup as AntdCheckboxGroup,
  Card as AntdCard, Popconfirm as AntdPopconfirm, Space as AntdSpace } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { PageWrapper } from '@/components/Page'
import { TABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
import { tableData, DataItem } from '../excel/export-excel/data'

const theadMap = {
  key: '数字输入框',
  name: '输入框',
  sex: '单选框',
  birth: '日期选择框',
  education: '选择器',
  hobby: '多选框',
  forbid: '开关',
  action: '按钮'
}

export default defineComponent({
  name: 'TableEditRow',
  setup() {
    const dataSource = ref(tableData)
    const tableColumns: ColumnType[] = [
      { title: '编号', dataIndex: 'key', width: 70, align: 'center' },
      { title: '姓名', dataIndex: 'name', width: 110, align: 'center' },
      { title: '性别', dataIndex: 'sex', width: 120, align: 'center' },
      { title: '生日', dataIndex: 'birth', width: 140, align: 'center' },
      { title: '学历', dataIndex: 'education', width: 80, align: 'center' },
      { title: '爱好', dataIndex: 'hobby', width: 250, align: 'center' },
      { title: '禁止编辑', dataIndex: 'forbid', width: 70, align: 'center' },
      { title: '操作', dataIndex: 'action', key: 'action', width: 70, align: 'center' }
    ]
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
    
    function openGithub() {
      openWindow(TABLE_PLUGIN_URL)
    }

    function handlePickDate(record: Recordable, date: string) {
      record.birth = date
    }

    function handleChecked(record: Recordable, checkedValue: string[]) {
      record.hobby = checkedValue.join('、')
    }

    function handleEdit(key: string) {
      editableData[key] = cloneDeep(unref(dataSource).filter(item => Number(key) === item.key)[0])
    }

    function handleSave(key: string) {
      Object.assign(unref(dataSource).filter(item => Number(key) === item.key)[0], editableData[key])
      delete editableData[key]
    }

    function handleCancle(key: string) {
      delete editableData[key]
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
              dataSource={unref(dataSource)}
              columns={tableColumns}
              pagination={false}
            >
              {{
                  headerCell: ({column, title}) => {
                    return <div>
                        <p>{title}</p>
                        <p class='sub-title'>({theadMap[column.dataIndex]})</p>
                      </div>
                  },
                  bodyCell: ({column, record, text}) => {
                    if (column.dataIndex === 'key') {
                      return editableData[record.key]
                        ? <AntdInputNumber v-model:value={editableData[record.key]['key']} min={1000} max={2000} />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'name') {
                      return editableData[record.key]
                        ? <AntdInput v-model:value={editableData[record.key]['name']} />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'sex') {
                      return editableData[record.key]
                        ? <AntdRadioGroup
                            v-model:value={editableData[record.key]['sex']}
                            options={['男', '女'].map(item => ({value: item, label: item}))}
                          />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'birth') {
                      return editableData[record.key]
                        ? <AntdDatePicker
                            value={dayjs(editableData[record.key]['birth'], 'YYYY-MM-DD')}
                            format='YYYY-MM-DD'
                            valueFormat='YYYY-MM-DD'
                            onChange={handlePickDate.bind(null, editableData[record.key])}
                          />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'education') {
                      return editableData[record.key]
                        ? <AntdSelect
                            v-model:value={editableData[record.key]['education']}
                            options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))}
                            style='width: 80px'
                          />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'hobby') {
                      return editableData[record.key]
                        ? <AntdCheckboxGroup
                            value={editableData[record.key]['hobby'].split('、')}
                            options={record.hobby.split('、').map(item => ({label: item, value: item}))}
                            onChange={handleChecked.bind(null, editableData[record.key])}
                          />
                        : <span>{text}</span>
                    }
                    else if (column.dataIndex === 'forbid') {
                      return editableData[record.key]
                        ? <AntdSwitch v-model:checked={editableData[record.key]['forbid']} />
                        : <span>{record.forbid ? '是' : '否'}</span>
                    }
                    else if (column.key === 'action') {
                      return editableData[record.key]
                        ? <AntdSpace>
                            <AntdButton
                              type='primary'
                              ghost
                              onClick={handleSave.bind(null, String(record.key))}
                            >保存</AntdButton>
                            <AntdPopconfirm
                              title='是否取消编辑？'
                              onConfirm={handleCancle.bind(null, String(record.key))}
                            >
                              <AntdButton
                                type='primary'
                                danger
                                ghost
                              >取消</AntdButton>
                            </AntdPopconfirm>
                          </AntdSpace>
                        : <AntdButton
                            disabled={record.forbid}
                            onClick={handleEdit.bind(null, String(record.key))}
                          >编辑</AntdButton>
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