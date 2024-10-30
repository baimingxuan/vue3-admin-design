import type { PropType } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/tree-select'
import type { DefaultOptionType, LegacyDataNode } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, omit } from 'lodash-es'
import { isArray, isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiTreeSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [Array, String] as PropType<SelectValue>
    },
    searchValue: {
      type: String,
      default: ''
    },
    treeExpandedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: () => []
    },
    treeCheckable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    treeData: {
      type: Array as PropType<Array<DefaultOptionType>>,
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
      default: 'label'
    },
    valueField: {
      type: String as PropType<string>,
      default: 'value'
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
    alwaysLoad: {
      type: Boolean as PropType<boolean>,
      default: false
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
  emits: ['update:value', 'update:searchValue', 'data-change', 'change'],
  setup(props, { attrs, slots, emit }) {
    const treeDataRef = ref<Array<DefaultOptionType>>([])
    const loading = ref(false)
    const isLoaded = ref<Boolean>(false)

    const fieldNames = {
      label: props.labelField,
      value: props.valueField,
      children: props.childrenField
    }

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
      () => unref(treeDataRef),
      () => {
        emit('data-change', unref(treeDataRef))
      }
    )

    async function handleFetch(visible: boolean) {
      if (visible && props.alwaysLoad) {
        await fetchData()
      }
    }

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

    async function loadData(treeNode: LegacyDataNode) {
      if (treeNode.children) return

      const request = props.api

      if (!request || !isFunction(request) || treeNode.loading) return

      try {
        treeNode.loading = true
        const res = await request({
          ...props.params,
          [props.asyncParamKey]: Reflect.get(treeNode, 'value')
        })

        if (isArray(res)) {
          const children = generatorTreeData(res)
          treeNode.children = children
          const _newTreeData = treeDataRef.value.map(node => {
            if (node.value === treeNode.value) {
              node.children = children
            }
            return node
          })
          treeDataRef.value = [..._newTreeData]
          return
        }

        const children = generatorTreeData(get(res, props.resultField) || [])
        treeNode.children = children
        const _newTreeData = treeDataRef.value.map(node => {
          if (node.value === treeNode.value) {
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

    function handleSearch(value: string) {
      emit('update:searchValue', value)
    }

    function handleChange(value: any, labelList: any) {
      emit('update:value', value)
      emit('change', value, labelList)
    }

    function generatorTreeData(options: any[]): DefaultOptionType[] {
      const { labelField, valueField, childrenField } = props

      return options.reduce((prev, next: Recordable<any>) => {
        if (next) {
          const item = {
            ...omit(next, [labelField, valueField]),
            label: get(next, labelField),
            value: get(next, valueField),
            isLeaf: next.isLeaf
          }

          const children = Reflect.get(next, childrenField)
          if (children) {
            Reflect.set(item, childrenField, generatorTreeData(children))
          }

          prev.push(item)
        }

        return prev
      }, [] as DefaultOptionType[])
    }

    return () => (
      <TreeSelect
        {...attrs}
        value={props.value}
        treeData={unref(getTreeData)}
        searchValue={props.searchValue}
        fieldNames={fieldNames}
        treeExpandedKeys={props.treeExpandedKeys}
        treeCheckable={props.treeCheckable}
        loadData={props.asyncFetch ? loadData : undefined}
        onDropdownVisibleChange={handleFetch}
        onSearch={handleSearch}
        onChange={handleChange}
      >
        {{
          ...slots,
          notFoundContent: () =>
            unref(loading) && (
              <div>
                <LoadingOutlined spin />
                <p>数据加载中...</p>
              </div>
            )
        }}
      </TreeSelect>
    )
  }
})
