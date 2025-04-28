<template>
  <Flex vertical gap="small" flex="1">
    <Card>
      <Form :model="formState" layout="inline" autocomplete="off" @finish="onSearch">
        <Form.Item label="菜单名" name="title">
          <Input v-model:value="formState.title" placeholder="请输入菜单名" />
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
  import { Flex, Space, Card, Form, Input, Button, Table } from 'ant-design-vue'

  interface FormState {
    title: string
  }

  const formState = reactive<FormState>({
    title: ''
  })

  const tabelColumns = [
    {
      title: '菜单名',
      dataIndex: 'title'
    },
    {
      title: '图标',
      dataIndex: 'icon'
    },
    {
      title: '类型',
      dataIndex: 'type'
    },
    {
      title: '排序',
      dataIndex: 'menu_sort'
    },
    {
      title: '权限标识',
      dataIndex: 'permission'
    },
    {
      title: '组件路径',
      dataIndex: 'component'
    },
    {
      title: '是否外链',
      dataIndex: 'iframe'
    },
    {
      title: '是否缓存',
      dataIndex: 'cache'
    },
    {
      title: '是否显示',
      dataIndex: 'hidden'
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
