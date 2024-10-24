import type { PropType } from 'vue'
import type { TreeSelectProps, SelectValue } from 'ant-design-vue/es/tree-select'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get } from 'lodash-es'
import { isArray, isFunction } from '@/utils/is'
import { useBindValue } from '../hooks/useBindValue'

export default defineComponent({
  name: 'ApiTreeSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [Array, String] as PropType<SelectValue>
    },
    treeData: {
      type: Array as PropType<TreeSelectProps['treeData']>,
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
    resultField: {
      type: String as PropType<string>,
      default: ''
    },
    childrenField: {
      type: String as PropType<string>,
      default: 'children'
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
    }
  },
  emits: ['update:value', 'options-change', 'load-data', 'change'],
  setup(props, { attrs, slots, emit }) {
    const treeDataRef = ref<TreeSelectProps['treeData']>([])
    const loading = ref(false)
    const isLoaded = ref<Boolean>(false)
    const emitData = ref<any[]>([])

    const fieldNames = {
      children: props.childrenField,
      value: props.valueField,
      label: props.labelField
    }

    const getAttrs = computed(() => {
      return {
        ...(props.api ? { treeData: unref(treeDataRef) } : { treeData: props.treeData }),
        ...attrs
      }
    })

    const [state] = useBindValue(props, 'value', 'change', emitData)

    onMounted(() => {
      props.immediate && fetchData()
    })

    watch(
      () => state.value,
      value => {
        emit('update:value', value)
      }
    )

    watch(
      () => props.params,
      () => {
        !unref(isLoaded) && fetchData()
      },
      { deep: true }
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
          treeDataRef.value = result
          emitChange()
          return
        }

        treeDataRef.value = get(result, props.resultField)
        emitChange()
      } catch (e) {
        console.error(e)
      } finally {
        loading.value = false
        isLoaded.value = false
      }
    }

    function emitChange() {
      emit('options-change', unref(treeDataRef))
    }

    function handleChange(_, ...args) {
      emitData.value = args
    }

    function loadData(treeNode) {
      return new Promise((resolve: (value?: unknown) => void) => {
        if (isArray(treeNode.children) && treeNode.children.length > 0) {
          resolve()
          return
        }
        emit('load-data', { treeData: treeDataRef, treeNode, resolve })
      })
    }

    return () => (
      <TreeSelect
        {...getAttrs}
        v-model:value={state}
        fieldNames={fieldNames}
        loadData={props.asyncFetch ? loadData : undefined}
        onDropdownVisibleChange={handleFetch}
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
