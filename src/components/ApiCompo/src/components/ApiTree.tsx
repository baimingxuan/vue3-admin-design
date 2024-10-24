import type { PropType } from 'vue'
import type { TreeProps, DataNode } from 'ant-design-vue/es/tree'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { Tree, Spin } from 'ant-design-vue'
import { get } from 'lodash-es'
import { isArray, isFunction } from '@/utils/is'
import { useFormItemRule } from '../hooks/useFormItemRule'

export default defineComponent({
  name: 'ApiTree',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<TreeProps['selectedKeys']>
    },
    treeData: {
      type: Array as PropType<TreeProps['treeData']>,
      default: () => []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<Recordable<any>>>
    },
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    resultField: {
      type: String as PropType<string>,
      default: ''
    },
    immediate: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    asyncFetch: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:value', 'options-change', 'load-data', 'change'],
  setup(props, { attrs, slots, emit }) {
    const treeDataRef = ref<DataNode[]>([])
    const loading = ref(false)
    const isLoaded = ref<Boolean>(false)
    const emitData = ref<any[]>([])

    const getAttrs = computed(() => {
      return {
        ...(props.api ? { treeData: unref(treeDataRef) } : { treeData: props.treeData }),
        ...attrs
      }
    })

    const [state] = useFormItemRule(props, 'value', 'change', emitData)

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

    watch(
      () => props.immediate,
      value => {
        value && !isLoaded.value && fetchData()
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

    function loadData(treeNode: DataNode) {
      return new Promise((resolve: (value?: unknown) => void) => {
        if (isArray(treeNode.children) && treeNode.children.length > 0) {
          resolve()
          return
        }
        emit('load-data', { treeData: treeDataRef, treeNode, resolve })
      })
    }

    return () => (
      <Spin spinning={unref(loading)}>
        <Tree
          {...getAttrs}
          v-model:selectedKeys={state}
          v-slots={{ ...slots }}
          loadData={props.asyncFetch ? loadData : undefined}
        />
      </Spin>
    )
  }
})
