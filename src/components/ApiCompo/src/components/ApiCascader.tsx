import type { PropType } from 'vue'
import type { CascaderOptionType, BaseOptionType } from 'ant-design-vue/es/cascader'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { Cascader } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, omit } from 'lodash-es'
import { isFunction, isArray } from '@/utils/is'
import { useBindValue } from '../hooks/useBindValue'

export default defineComponent({
  name: 'ApiCascader',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<string[] | number[]>
    },
    options: {
      type: Array as PropType<Array<CascaderOptionType>>,
      default: []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<CascaderOptionType[]>>
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
    },
    numberToString: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:value', 'change'],
  setup(props, { attrs, slots, emit }) {
    const optionsRef = ref<CascaderOptionType[]>([])
    const resData = ref<any[]>([])
    const loading = ref(false)
    const isLoaded = ref(false)
    const emitData = ref<CascaderOptionType[]>([])

    const getOptions = computed(() => {
      return unref(optionsRef).length > 0 ? unref(optionsRef) : props.options
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

    watch(
      resData,
      data => {
        const opts = generatorOptions(data)
        optionsRef.value = opts
      },
      { deep: true }
    )

    async function fetchData() {
      const request = props.api

      if (!request || !isFunction(request) || loading.value) return

      resData.value = []

      try {
        loading.value = true
        const result = await request(props.params)
        isLoaded.value = true

        if (isArray(result)) {
          resData.value = result
          return
        }

        resData.value = get(result, props.resultField) || []
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
        isLoaded.value = false
      }
    }

    async function loadData(selectedOptions: BaseOptionType) {
      const targetOption = selectedOptions[selectedOptions.length - 1]

      const request = props.api

      if (!request || !isFunction(request) || targetOption.loading) return

      try {
        targetOption.loading = true
        const res = await request({
          ...props.params,
          [props.asyncParamKey]: Reflect.get(targetOption, 'value')
        })

        if (isArray(res)) {
          const children = generatorOptions(res)
          targetOption.children = children
          return
        }

        const children = generatorOptions(get(res, props.resultField) || [])
        targetOption.children = children
      } catch (e) {
        console.error(e)
      } finally {
        targetOption.loading = false
      }
    }

    async function handleFetch(visible: boolean) {
      if (visible && props.alwaysLoad) {
        await fetchData()
      }
    }

    function handleChange(_, ...args) {
      emitData.value = args
    }

    function generatorOptions(options: any[]): CascaderOptionType[] {
      const { labelField, valueField, childrenField, numberToString } = props

      return options.reduce((prev, next: Recordable<any>) => {
        if (next) {
          const value = next[valueField]
          const item = {
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value,
            isLeaf: next.isLeaf
          }

          const children = Reflect.get(next, childrenField)
          if (children) {
            Reflect.set(item, childrenField, generatorOptions(children))
          }

          prev.push(item)
        }

        return prev
      }, [] as CascaderOptionType[])
    }

    return () => (
      <Cascader
        {...attrs}
        v-model:value={state}
        options={unref(getOptions)}
        changeOnSelect
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
      </Cascader>
    )
  }
})
