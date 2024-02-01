import type { TableProps, ColumnType } from 'ant-design-vue/lib/table'
import { defineComponent, createVNode, ref, unref, reactive, onMounted } from 'vue'
import {
  Card,
  Button,
  Table,
  Tag,
  Select,
  Switch,
  Popover,
  Space,
  Modal,
  Form,
  Input,
  CheckboxGroup
} from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { TABLE_COMPO } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { PageWrapper } from '@/components/Page'
import { cloneDeep } from 'lodash-es'

interface APIResult {
  list: any[]
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
    const tableLoading = ref<boolean>(false)
    const tableData = ref<any[]>([])
    const tableTotal = ref<number>(0)
    const tableQuery = reactive({
      current: 1,
      pageSize: 10
    })

    const modalVisibel = ref<boolean>(false)
    const editForm = reactive({
      name: '',
      phone: '',
      education: '',
      hobby: []
    })
    const editRecord = ref({})
    const editHobbys = ref<string[]>([])

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

    onMounted(() => {
      fetchData()
    })

    async function fetchData() {
      tableLoading.value = true
      try {
        const data = await getTableList(tableQuery)
        const { list, total } = data as unknown as APIResult
        tableData.value = list
        tableTotal.value = total
        tableLoading.value = false
      } catch (error) {
        tableLoading.value = false
        console.log(error)
      }
    }

    function handlePageChange(page: number, pageSize: number) {
      tableQuery.current = page
      tableQuery.pageSize = pageSize
      fetchData()
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

    function handleEdit(record: Recordable) {
      editForm.name = record.name
      editForm.phone = record.phone
      editForm.education = record.education
      editForm.hobby = record.hobby
      editRecord.value = cloneDeep(record)
      editHobbys.value = cloneDeep(record.hobby)
      modalVisibel.value = true
    }

    function handleConfirm() {
      // 调用接口
      modalVisibel.value = false
    }

    function handleCancle() {
      modalVisibel.value = false
    }

    return () => (
      <PageWrapper plugin={TABLE_COMPO}>
        <Card>
          <Table
            rowKey='id'
            rowSelection={tableSelection}
            columns={tableColumns}
            dataSource={unref(tableData)}
            loading={unref(tableLoading)}
            pagination={{
              current: tableQuery.current,
              pageSize: tableQuery.pageSize,
              total: unref(tableTotal),
              showTotal: () => `Total ${unref(tableTotal)} items`,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: handlePageChange
            }}
          >
            {{
              bodyCell: ({ column, record }) => {
                if (column.dataIndex === 'name') {
                  const slots = {
                    content: () => (
                      <>
                        <p>姓名: {record.name}</p>
                        <p>手机: {record.phone}</p>
                        <p>爱好: {record.hobby.join('、')}</p>
                      </>
                    )
                  }
                  return (
                    <Popover v-slots={slots}>
                      <Tag color='blue'>{record.name}</Tag>
                    </Popover>
                  )
                } else if (column.dataIndex === 'married') {
                  return <Select v-model={[record.married, 'value']} options={marriedOptions} />
                } else if (column.dataIndex === 'hobby') {
                  return <span>{record.hobby.join('、')}</span>
                } else if (column.dataIndex === 'forbid') {
                  return <Switch v-model={[record.forbid, 'checked']} />
                } else if (column.key === 'action') {
                  return (
                    <Space>
                      <Button disabled={record.forbid} onClick={() => handleEdit(record)}>
                        编辑
                      </Button>
                      <Button danger onClick={handleDelete}>
                        删除
                      </Button>
                    </Space>
                  )
                }
              }
            }}
          </Table>
          <Modal
            open={unref(modalVisibel)}
            title='编辑'
            width='600px'
            okText='确定'
            cancelText='取消'
            onCancel={handleCancle}
            onOk={handleConfirm}
          >
            <Form
              model={editForm}
              colon={false}
              labelCol={{ span: 4 }}
              labelAlign='left'
              style={{ width: '80%', margin: '0 auto' }}
            >
              <Form.Item label='姓名' name='name'>
                <Input v-model:value={editForm.name} disabled />
              </Form.Item>
              <Form.Item label='手机' name='phone'>
                <Input v-model:value={editForm.phone} placeholder='请输入手机号码' />
              </Form.Item>
              <Form.Item label='学历' name='education'>
                <Select
                  v-model:value={editForm.education}
                  options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))}
                />
              </Form.Item>
              <Form.Item label='爱好' name='hobby'>
                <CheckboxGroup
                  v-model:value={editForm.hobby}
                  options={unref(editHobbys).map(item => ({ label: item, value: item }))}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageWrapper>
    )
  }
})
