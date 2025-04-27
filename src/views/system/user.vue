<template>
  <Flex gap="small">
    <Card>
      <Flex vertical gap="small">
        <Input v-model:value="filterText" placeholder="请输入部门名称" @change="onFilterTextChange">
          <template #prefix>
            <SearchOutlined />
          </template>
        </Input>
        <Tree
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          :tree-data="treeData"
          :load-data="onLoadTreeData"
        />
      </Flex>
    </Card>
    <Flex vertical gap="small" flex="1">
      <Card>
        <Form :model="formState" layout="inline" autocomplete="off" @finish="onSearch">
          <Form.Item label="用户名" name="username">
            <Input v-model:value="formState.username" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              v-model:value="formState.status"
              placeholder="请选择状态"
              style="width: 200px"
              :options="statusOptions"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" @click="onSearch">查询</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Flex vertical gap="middle">
          <Space>
            <Button type="primary" @click="onAdd">新增</Button>
            <Button type="primary" danger @click="onDelete">删除</Button>
          </Space>
          <Table :dataSource="tabelData" :columns="tabelColumns" />
        </Flex>
      </Card>
    </Flex>
  </Flex>
</template>

<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import { Flex, Space, Card, Form, Input, Tree, Select, Button, Table } from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'

interface FormState {
  username: string
  status: number
}

const statusOptions = [
  { label: '正常', value: 1 },
  { label: '禁用', value: 0 }
]

const filterText = ref<string>('')
const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const treeData = ref<TreeProps['treeData']>([
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true }
])

const formState = reactive<FormState>({
  username: '',
  status: 1
})

const tabelColumns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'nick_name'
  },
  {
    title: '性别',
    dataIndex: 'gender'
  },
  {
    title: '电话',
    dataIndex: 'phone'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '部门',
    dataIndex: 'dept'
  },
  {
    title: '状态',
    dataIndex: ' enabled'
  },
  {
    title: '创建时间',
    dataIndex: ' create_time'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const tabelData = ref([
  {
    key: '1',
    username: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  }
])

const onFilterTextChange = e => {
  console.log(e)
}

const onLoadTreeData: TreeProps['loadData'] = treeNode => {
  return new Promise<void>(resolve => {
    if (treeNode.dataRef!.children) {
      resolve()
      return
    }
    setTimeout(() => {
      treeNode.dataRef!.children = [
        { title: 'Child Node', key: `${treeNode.eventKey}-0` },
        { title: 'Child Node', key: `${treeNode.eventKey}-1` }
      ]
      treeData.value = [...treeData.value!]
      resolve()
    }, 1000)
  })
}

const onSearch = (values: any) => {
  console.log('Success:', values)
}

const onAdd = () => {
  console.log('add')
}

const onDelete = () => {
  console.log('delete')
}
</script>

<style scoped lang="less"></style>
