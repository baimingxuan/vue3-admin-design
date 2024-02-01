import type { UnwrapRef } from 'vue'
import { defineComponent, ref, unref, reactive } from 'vue'
import {
  Button,
  Table,
  Select,
  Switch,
  InputNumber,
  Input,
  DatePicker,
  RadioGroup,
  CheckboxGroup,
  Card,
  Popconfirm,
  Space
} from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/lib/table'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { PageWrapper } from '@/components/Page'
import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting'
import { tableData, type DataItem } from '../excel/export-excel/data'

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
      <PageWrapper plugin={TABLE_EDIT_COMPO}>
        <Card>
          <Table dataSource={unref(dataSource)} columns={tableColumns} pagination={false}>
            {{
              headerCell: ({ column, title }) => {
                return (
                  <div>
                    <p>{title}</p>
                    <p class='sub-title'>({theadMap[column.dataIndex]})</p>
                  </div>
                )
              },
              bodyCell: ({ column, record, text }) => {
                if (column.dataIndex === 'key') {
                  return editableData[record.key] ? (
                    <InputNumber v-model:value={editableData[record.key]['key']} min={1000} max={2000} />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'name') {
                  return editableData[record.key] ? (
                    <Input v-model:value={editableData[record.key]['name']} />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'sex') {
                  return editableData[record.key] ? (
                    <RadioGroup
                      v-model:value={editableData[record.key]['sex']}
                      options={['男', '女'].map(item => ({ value: item, label: item }))}
                    />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'birth') {
                  return editableData[record.key] ? (
                    <DatePicker
                      value={dayjs(editableData[record.key]['birth'], 'YYYY-MM-DD')}
                      format='YYYY-MM-DD'
                      valueFormat='YYYY-MM-DD'
                      onChange={handlePickDate.bind(null, editableData[record.key])}
                    />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'education') {
                  return editableData[record.key] ? (
                    <Select
                      v-model:value={editableData[record.key]['education']}
                      options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))}
                      style='width: 80px'
                    />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'hobby') {
                  return editableData[record.key] ? (
                    <CheckboxGroup
                      value={editableData[record.key]['hobby'].split('、')}
                      options={record.hobby.split('、').map(item => ({ label: item, value: item }))}
                      onChange={handleChecked.bind(null, editableData[record.key])}
                    />
                  ) : (
                    <span>{text}</span>
                  )
                } else if (column.dataIndex === 'forbid') {
                  return editableData[record.key] ? (
                    <Switch v-model:checked={editableData[record.key]['forbid']} />
                  ) : (
                    <span>{record.forbid ? '是' : '否'}</span>
                  )
                } else if (column.key === 'action') {
                  return editableData[record.key] ? (
                    <Space>
                      <Button type='primary' ghost onClick={handleSave.bind(null, String(record.key))}>
                        保存
                      </Button>
                      <Popconfirm title='是否取消编辑？' onConfirm={handleCancle.bind(null, String(record.key))}>
                        <Button type='primary' danger ghost>
                          取消
                        </Button>
                      </Popconfirm>
                    </Space>
                  ) : (
                    <Button disabled={record.forbid} onClick={handleEdit.bind(null, String(record.key))}>
                      编辑
                    </Button>
                  )
                }
              }
            }}
          </Table>
        </Card>
      </PageWrapper>
    )
  }
})
