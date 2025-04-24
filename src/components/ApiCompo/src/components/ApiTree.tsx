import type { PropType } from 'vue'
import type { DataNode, EventDataNode } from 'ant-design-vue/es/tree'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { Tree, Spin } from 'ant-design-vue'
import { get, omit } from 'lodash-es'
import { isArray, isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiTree',
  inheritAttrs: false,
  props: {
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    },
    checkedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    },
    expandedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    },
    checkable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    treeData: {
      type: Array as PropType<DataNode[]>,
      default: () => []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<Recordable<any>>>
    },
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    labelField: {
      type: String as PropType<string>,
      default: 'title'
    },
    valueField: {
      type: String as PropType<string>,
      default: 'key'
    },
    childrenField: {
      type: String as PropType<string>,
      default: 'children'
    },
    resultField: {
      type: String as PropType<string>,
      default: 'result'
    },
    immediate: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    asyncFetch: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    asyncParamKey: {
      type: String as PropType<string>,
      default: 'parentId'
    }
  },
  emits: ['update:selectedKeys', 'update:checkedKeys', 'data-change', 'select', 'check'],
  setup(props, { attrs, slots, emit }) {
    const treeDataRef = ref<DataNode[]>([])
    const loading = ref(false)
    const isLoaded = ref<Boolean>(false)

    const getTreeData = computed(() => (unref(treeDataRef).length > 0 ? unref(treeDataRef) : props.treeData))

    onMounted(() => {
      props.immediate && fetchData()
    })

    watch(
      () => props.params,
      () => {
        !unref(isLoaded) && fetchData()
      },
      { deep: true }
    )

    watch(
      () => props.immediate,
      value => {
        value && !isLoaded.value && fetchData()
      }
    )

    watch(
      () => unref(treeDataRef),
      () => {
        emit('data-change', unref(treeDataRef))
      }
    )

    watch(
      () => props.checkable,
      checkable => {
        if (!checkable) {
          emit('update:checkedKeys', [])
        }
      }
    )

    async function fetchData() {
      const request = props.api

      if (!request || !isFunction(request) || loading.value) return

      let result
      treeDataRef.value = []

      try {
        loading.value = true
        result = await request(props.params)
        isLoaded.value = true

        if (isArray(result)) {
          treeDataRef.value = generatorTreeData(result)
          return
        }

        const data = get(result, props.resultField)
        treeDataRef.value = generatorTreeData(data)
      } catch (e) {
        console.error(e)
      } finally {
        loading.value = false
        isLoaded.value = false
      }
    }

    async function loadData(treeNode: EventDataNode) {
      if (treeNode.dataRef?.children) return

      const request = props.api

      if (!request || !isFunction(request) || treeNode.loading) return

      try {
        treeNode.loading = true
        const res = await request({
          ...props.params,
          [props.asyncParamKey]: Reflect.get(treeNode, 'eventKey')
        })

        if (isArray(res)) {
          const children = generatorTreeData(res)
          treeNode.dataRef!.children = children
          const _newTreeData = treeDataRef.value.map(node => {
            if (node.key === treeNode.eventKey) {
              node.children = children
            }
            return node
          })
          treeDataRef.value = [..._newTreeData]
          return
        }

        const children = generatorTreeData(get(res, props.resultField) || [])
        treeNode.dataRef!.children = children
        const _newTreeData = treeDataRef.value.map(node => {
          if (node.key === treeNode.eventKey) {
            node.children = children
          }
          return node
        })
        treeDataRef.value = [..._newTreeData]
      } catch (e) {
        console.error(e)
      } finally {
        treeNode.loading = false
      }
    }

    function handleSelect(selectedKeys, info: any) {
      emit('update:selectedKeys', selectedKeys)
      emit('select', selectedKeys, info)
    }

    function handleCheck(checkedKeys, info: any) {
      emit('update:checkedKeys', checkedKeys)
      emit('check', checkedKeys, info)
    }

    function generatorTreeData(options: any[]): DataNode[] {
      const { labelField, valueField, childrenField } = props

      return options.reduce((prev, next: Recordable<any>) => {
        if (next) {
          const item = {
            ...omit(next, [labelField, valueField]),
            title: get(next, labelField),
            key: get(next, valueField),
            isLeaf: next.isLeaf
          }

          const children = Reflect.get(next, childrenField)
          if (children) {
            Reflect.set(item, childrenField, generatorTreeData(children))
          }

          prev.push(item)
        }

        return prev
      }, [] as DataNode[])
    }

    return () => (
      <Spin spinning={unref(loading)}>
        <Tree
          {...attrs}
          selectedKeys={props.selectedKeys}
          checkedKeys={props.checkedKeys}
          expandedKeys={props.expandedKeys}
          v-slots={{ ...slots }}
          treeData={unref(getTreeData)}
          loadData={props.asyncFetch ? loadData : undefined}
          onSelect={handleSelect}
          onCheck={handleCheck}
        />
      </Spin>
    )
  }
})
