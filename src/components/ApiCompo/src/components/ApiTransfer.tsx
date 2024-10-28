import type { PropType } from 'vue'
import type { TransferItem } from 'ant-design-vue/lib/transfer'
import type { TransferDirection } from 'ant-design-vue/lib/transfer'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { Transfer } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { isFunction, isArray } from '@/utils/is'
import { get, omit } from 'lodash-es'

export default defineComponent({
  name: 'ApiTransfer',
  inheritAttrs: false,
  props: {
    targetKeys: {
      type: Array as PropType<Array<string>>,
      default: () => []
    },
    selectedKeys: {
      type: Array as PropType<Array<string>>,
      default: () => []
    },
    dataSource: {
      type: Array as PropType<Array<TransferItem>>,
      default: []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<TransferItem[]>>
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
    resultField: {
      type: String as PropType<string>,
      default: ''
    },
    immediate: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['update:targetKeys', 'update:selectedKeys', 'options-change', 'change'],
  setup(props, { attrs, slots, emit }) {
    const dataSourceRef = ref<TransferItem[]>([])
    const loading = ref(false)
    const isLoaded = ref(false)

    const getDataSource = computed(() => {
      const { labelField, valueField } = props

      const data = unref(dataSourceRef).reduce((prev, next: any) => {
        if (next) {
          prev.push({
            ...omit(next, [labelField, valueField]),
            title: get(next, labelField),
            key: get(next, valueField)
          })
        }

        return prev
      }, [] as TransferItem[])

      return data.length > 0 ? data : props.dataSource
    })

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

    async function fetchData() {
      const request = props.api

      if (!request || !isFunction(request) || loading.value) return

      dataSourceRef.value = []

      try {
        loading.value = true
        const result = await request(props.params)
        isLoaded.value = true

        if (isArray(result)) {
          dataSourceRef.value = result
          emitChange()
          return
        }

        if (props.resultField) {
          dataSourceRef.value = get(result, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
        isLoaded.value = false
      }
    }

    function emitChange() {
      emit('options-change', unref(getDataSource))
    }

    function handleChange(targetKeys: string[], direction: TransferDirection, moveKeys: string[]) {
      emit('update:targetKeys', targetKeys)
      emit('change', targetKeys, direction, moveKeys)
    }

    function handleSelectChange(sourceSelectedKeys: string[], targetSelectedKeys: string[]) {
      emit('update:selectedKeys', [...new Set([...sourceSelectedKeys, ...targetSelectedKeys])])
    }

    return () => (
      <Transfer
        render={item => item.title}
        {...attrs}
        dataSource={unref(getDataSource)}
        targetKeys={props.targetKeys}
        selectedKeys={props.selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
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
      </Transfer>
    )
  }
})
