<template>
  <Flex vertical gap="small" flex="1">
    <Card>
      <Form :model="formState" layout="inline" autocomplete="off" @finish="onSearch">
        <Form.Item label="字典名" name="name">
          <Input v-model:value="formState.name" placeholder="请输入字典名" />
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
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { Flex, Space, Card, Form, Input, Button, Table } from 'ant-design-vue'

  interface FormState {
    name: string
    status: number
  }

  const formState = reactive<FormState>({
    name: '',
    status: 1
  })

  const tabelColumns = [
    {
      title: '字典名',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description'
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
