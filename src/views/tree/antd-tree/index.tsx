import type { AntTreeNodeDropEvent, TreeProps } from 'ant-design-vue/es/tree'
import { defineComponent, ref } from 'vue'
import { Row, Col, Card, Tree } from 'ant-design-vue'
import { TREE_COMPO } from '@/settings/websiteSetting'
import { PageWrapper } from '@/components/Page'
import { treeData } from './data'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  name: 'AntdTree',
  setup() {
    const checkedKeys = ref<string[]>(['2-1', '3-2-2'])
    const expandedKeys = ref<string[]>([])
    const selectedKeys = ref<string[]>([])

    const dragTreeData = ref(cloneDeep(treeData))
    const lazyTreeData = ref([
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true }
    ])

    function handleLoadData(treeNode) {
      return new Promise<void>(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` }
          ]
          lazyTreeData.value = [...lazyTreeData.value]
          resolve()
        }, 1000)
      })
    }

    function handleDrop(info: AntTreeNodeDropEvent) {
      const dropKey = info.node.key
      const dragKey = info.dragNode.key
      const dropPos = info.node.pos?.split('-')!
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const loop = (data: TreeProps['treeData'] = [], key: string | number, callback: any) => {
        data.forEach((item, index) => {
          if (item.key === key) {
            return callback(item, index, data)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      const data = [...dragTreeData.value]

      // Find dragObject
      let dragObj: any
      loop(data, dragKey, (item: any, index: number, arr: TreeProps['treeData'] = []) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item: any) => {
          item.children = item.children || []
          /// where to insert
          item.children.unshift(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item: any) => {
          item.children = item.children || []
          // where to insert
          item.children.unshift(dragObj)
        })
      } else {
        let ar: TreeProps['treeData'] = []
        let i = 0
        loop(data, dropKey, (_item: any, index: number, arr: TreeProps['treeData']) => {
          ar = arr
          i = index
        })
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj)
        } else {
          ar.splice(i + 1, 0, dragObj)
        }
      }
      dragTreeData.value = data
    }

    return () => (
      <PageWrapper plugin={TREE_COMPO}>
        <Row gutter={12}>
          <Col span={8}>
            <Card title='可选择节点' bodyStyle={{ height: '420px' }}>
              <Tree v-model:checkedKeys={checkedKeys.value} treeData={treeData} checkable defaultExpandAll />
            </Card>
          </Col>
          <Col span={8}>
            <Card title='懒加载节点' bodyStyle={{ height: '420px' }}>
              <Tree
                v-model:expandedKeys={expandedKeys.value}
                v-model:selectedKeys={selectedKeys.value}
                checkable
                treeData={lazyTreeData.value}
                loadData={handleLoadData}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title='可拖拽节点' bodyStyle={{ height: '420px' }}>
              <Tree treeData={dragTreeData.value} draggable blockNode defaultExpandAll onDrop={handleDrop} />
            </Card>
          </Col>
        </Row>
      </PageWrapper>
    )
  }
})
