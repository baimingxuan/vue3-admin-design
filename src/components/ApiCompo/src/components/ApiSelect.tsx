import type { PropType } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { SelectOptionsType } from '../types'
import { defineComponent, ref, computed, unref, watch, onMounted } from 'vue'
import { Select } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, omit } from 'lodash-es'
import { isFunction, isArray } from '@/utils/is'
import { useBindValue } from '../hooks/useBindValue'

export default defineComponent({
  name: 'ApiSelect',
  inheritAttrs: false,
  props: {
    value: {
      type: [Array, Object, String, Number] as PropType<SelectValue>
    },
    options: {
      type: Array as PropType<Array<SelectOptionsType>>,
      default: []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<SelectOptionsType[]>>
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
    immediate: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    alwaysLoad: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    numberToString: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:value', 'options-change', 'change'],
  setup(props, { attrs, slots, emit }) {
    const optionsRef = ref<SelectOptionsType[]>([])

    const loading = ref(false)
    const isLoaded = ref(false)
    const emitData = ref<SelectOptionsType[]>([])

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      const data = unref(optionsRef).reduce((prev, next: any) => {
        if (next) {
          const value = get(next, valueField)

          prev.push({
            ...omit(next, [labelField, valueField]),
            label: get(next, labelField),
            value: numberToString ? `${value}` : value
          })
        }

        return prev
      }, [] as SelectOptionsType[])

      return data.length > 0 ? data : props.options
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

    async function fetchData() {
      const request = props.api

      if (!request || !isFunction(request) || loading.value) return

      optionsRef.value = []

      try {
        loading.value = true
        const result = await request(props.params)
        isLoaded.value = true

        if (isArray(result)) {
          optionsRef.value = result
          emitChange()
          return
        }

        if (props.resultField) {
          optionsRef.value = get(result, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
        isLoaded.value = false
      }
    }

    async function handleFetch(visible: boolean) {
      if (visible && props.alwaysLoad) {
        await fetchData()
      }
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    function handleChange(_, ...args) {
      emitData.value = args
    }

    return () => (
      <Select
        {...attrs}
        v-model:value={state}
        options={unref(getOptions)}
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
      </Select>
    )
  }
})
