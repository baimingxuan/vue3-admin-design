import { defineComponent, ref } from 'vue'
import { Row as AntdRow, Col as AntdCol, Card as AntdCard, Button as AntdButton } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import { DRAGGABLE_PLUGIN_URL } from '@/settings/websiteSetting'
import { openWindow } from '@/utils'
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
    const dragLogs = ref<string[]>([
      '列表1 => 列表2, 6 => 1',
      '列表1 => 列表2, 6 => 2'
    ])

    function openGithub() {
      openWindow(DRAGGABLE_PLUGIN_URL)
    }

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
      <PageWrapper name='Draggable 拖拽列表'>
        {{
          header: () => <>
            <p>Vue.Draggable: 基于Sortable.js的vue组件, 用以实现拖拽功能。</p>
            <p>组件地址:<AntdButton type='link' onClick={openGithub}>立即访问</AntdButton></p>
          </>,
          default: () => <AntdRow gutter={12}>
              <AntdCol span={5}>
                <AntdCard title='列表1事项' bordered={false} bodyStyle={{height: '520px'}}>
                  {/* @ts-ignore */}
                  <Draggable list={listOne.value} itemKey='name' group='list' style='height: 100%' class='list1' onEnd={handleDrop}>
                    {{
                      item: ({ element}) => (
                          <AntdCard
                            hoverable
                            size='small'
                            style='margin-bottom: 12px;'
                          >
                            {element.name}
                          </AntdCard>
                        )
                    }}
                  </Draggable>
                </AntdCard>
              </AntdCol>
              <AntdCol span={5}>
                <AntdCard title='列表2事项' bordered={false} bodyStyle={{height: '520px'}}>
                  {/* @ts-ignore */}
                  <Draggable list={listTwo.value} itemKey='name' group='list' style='height: 100%' class='list2' onEnd={handleDrop}>
                    {{
                      item: ({ element}) => (
                          <AntdCard
                            hoverable
                            size='small'
                            style='margin-bottom: 12px;'
                          >
                            {element.name}
                          </AntdCard>
                        )
                    }}
                  </Draggable>
                </AntdCard>
              </AntdCol>
              <AntdCol span={4}>
                <AntdCard title='操作记录' bordered={false} bodyStyle={{height: '520px'}}>
                  { dragLogs.value.map(item => {
                    return <p style='margin-bottom: 8px'>{item}</p>
                  }) }
                </AntdCard>
              </AntdCol>
              <AntdCol span={5}>
                <AntdCard title='列表1数据' bordered={false} bodyStyle={{height: '520px'}}>
                  <pre>
                    {JSON.stringify(listOne.value, null, 2)}
                  </pre>
                </AntdCard>
              </AntdCol>
              <AntdCol span={5}>
                <AntdCard title='列表2数据' bordered={false} bodyStyle={{height: '520px'}}>
                  <pre>
                   {JSON.stringify(listTwo.value, null, 2)}
                  </pre>
                </AntdCard>
              </AntdCol>
            </AntdRow>
        }}
      </PageWrapper>
    )
  }
})