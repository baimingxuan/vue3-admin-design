import { defineComponent, ref } from 'vue'
import { Row, Col, Card } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { DRAGGABLE_PLUGIN } from '@/settings/websiteSetting'
import Draggable from 'vuedraggable'

export default defineComponent({
  name: 'DragList',
  setup() {
    const listOne = ref([
      { name: 'ECMAScript6', id: 1 },
      { name: 'VueJS', id: 2 },
      { name: 'ReactJS', id: 3 },
      { name: 'AngularJS', id: 4 },
      { name: 'Webpack', id: 5 }
    ])
    const listTwo = ref([
      { name: 'NodeJS', id: 6 },
      { name: 'TypeScript', id: 7 }
    ])
    const dragLogs = ref<string[]>(['列表1 => 列表2, 6 => 1', '列表1 => 列表2, 6 => 2'])

    function handleDrop(event: any) {
      const listMap = new Map([
        ['list1', '列表1'],
        ['list2', '列表2']
      ])
      const fromClsName = event.from.className
      const toClsName = event.to.className
      const from = listMap.get(fromClsName)
      const to = listMap.get(toClsName)
      dragLogs.value.push(`${from} => ${to}, ${event.oldIndex + 1} => ${event.newIndex + 1}`)
    }

    return () => (
      <PageWrapper plugin={DRAGGABLE_PLUGIN}>
        <Row gutter={12}>
          <Col span={5}>
            <Card title='列表1事项' bodyStyle={{ height: '520px' }}>
              <Draggable
                list={listOne.value}
                itemKey='name'
                group='list'
                style='height: 100%'
                class='list1'
                onEnd={handleDrop}
              >
                {{
                  item: ({ element }) => (
                    <Card hoverable size='small' style='margin-bottom: 12px;'>
                      {element.name}
                    </Card>
                  )
                }}
              </Draggable>
            </Card>
          </Col>
          <Col span={5}>
            <Card title='列表2事项' bodyStyle={{ height: '520px' }}>
              <Draggable
                list={listTwo.value}
                itemKey='name'
                group='list'
                style='height: 100%'
                class='list2'
                onEnd={handleDrop}
              >
                {{
                  item: ({ element }) => (
                    <Card hoverable size='small' style='margin-bottom: 12px;'>
                      {element.name}
                    </Card>
                  )
                }}
              </Draggable>
            </Card>
          </Col>
          <Col span={4}>
            <Card title='操作记录' bodyStyle={{ height: '520px' }}>
              {dragLogs.value.map(item => {
                return <p style='margin-bottom: 8px'>{item}</p>
              })}
            </Card>
          </Col>
          <Col span={5}>
            <Card title='列表1数据' bodyStyle={{ height: '520px' }}>
              <pre>{JSON.stringify(listOne.value, null, 2)}</pre>
            </Card>
          </Col>
          <Col span={5}>
            <Card title='列表2数据' bodyStyle={{ height: '520px' }}>
              <pre>{JSON.stringify(listTwo.value, null, 2)}</pre>
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})
