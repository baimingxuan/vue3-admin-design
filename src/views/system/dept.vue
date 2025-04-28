<template>
  <Flex vertical gap="small" flex="1">
    <Card>
      <Form :model="formState" layout="inline" autocomplete="off" @finish="onSearch">
        <Form.Item label="部门名" name="name">
          <Input v-model:value="formState.name" placeholder="请输入部门名" />
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
        <Table :dataSource="tabelData" :columns="tabelColumns" :pagination="false" />
      </Flex>
    </Card>
  </Flex>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { Flex, Space, Card, Form, Input, Select, Button, Table } from 'ant-design-vue'

  interface FormState {
    name: string
    status: number
  }

  const statusOptions = [
    { label: '正常', value: 1 },
    { label: '禁用', value: 0 }
  ]

  const formState = reactive<FormState>({
    name: '',
    status: 1
  })

  const tabelColumns = [
    {
      title: '部门名',
      dataIndex: 'title'
    },
    {
      title: '排序',
      dataIndex: 'dept_sort'
    },
    {
      title: '状态',
      dataIndex: 'enabled'
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
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    }
  ])

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

<style lang="less" scoped></style>
