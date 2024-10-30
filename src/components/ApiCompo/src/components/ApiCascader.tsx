import type { PropType } from 'vue'
import type { CascaderOptionType, BaseOptionType } from 'ant-design-vue/es/cascader'
import { defineComponent, ref, unref, computed, watch, onMounted } from 'vue'
import { Cascader } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { get, omit } from 'lodash-es'
import { isFunction, isArray } from '@/utils/is'

export default defineComponent({
  name: 'ApiCascader',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<string[] | number[]>,
      default: () => []
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
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
    }
  },
  emits: ['update:value', 'data-change', 'change'],
  setup(props, { attrs, slots, emit }) {
    const optionsRef = ref<CascaderOptionType[]>([])
    const loading = ref(false)
    const isLoaded = ref(false)

    const fieldNames = {
      label: props.labelField,
      value: props.valueField,
      children: props.childrenField
    }

    const getOptions = computed(() => {
      return unref(optionsRef).length > 0 ? unref(optionsRef) : props.options
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
      () => unref(optionsRef),
      () => {
        emit('data-change', unref(optionsRef))
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
      optionsRef.value = []

      try {
        loading.value = true
        result = await request(props.params)
        isLoaded.value = true

        if (isArray(result)) {
          optionsRef.value = generatorOptions(result)
          return
        }

        const data = get(result, props.resultField) || []
        optionsRef.value = generatorOptions(data)
      } catch (error) {
        console.error(error)
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
          const _newOptionData = optionsRef.value.map(node => {
            if (node.value === targetOption.value) {
              node.children = children
            }
            return node
          })
          optionsRef.value = [..._newOptionData]
          return
        }

        const children = generatorOptions(get(res, props.resultField) || [])
        targetOption.children = children
        const _newOptionData = optionsRef.value.map(node => {
          if (node.value === targetOption.value) {
            node.children = children
          }
          return node
        })
        optionsRef.value = [..._newOptionData]
      } catch (e) {
        console.error(e)
      } finally {
        targetOption.loading = false
      }
    }

    function handleChange(value: any, selectOptions: any) {
      emit('update:value', value)
      emit('change', value, selectOptions)
    }

    function generatorOptions(options: any[]): CascaderOptionType[] {
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
        value={props.value}
        options={unref(getOptions)}
        fieldNames={fieldNames}
        multiple={props.multiple}
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
