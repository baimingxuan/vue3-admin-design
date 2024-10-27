import type { PropType } from 'vue'
import type { CheckboxValueType, CheckboxOptionType } from 'ant-design-vue/es/checkbox/interface'
import { defineComponent, ref, computed, unref, watch, onMounted } from 'vue'
import { Checkbox, Spin } from 'ant-design-vue'
import { get, omit } from 'lodash-es'
import { isFunction, isArray } from '@/utils/is'
import { useBindValue } from '../hooks/useBindValue'

export default defineComponent({
  name: 'ApiCheckboxGroup',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<Array<CheckboxValueType>>
    },
    options: {
      type: Array as PropType<Array<CheckboxOptionType>>,
      default: []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<CheckboxOptionType[]>>
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
    numberToString: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:value', 'options-change', 'change'],
  setup(props, { attrs, emit }) {
    const optionsRef = ref<CheckboxOptionType[]>([])

    const loading = ref(false)
    const isLoaded = ref(false)
    const emitData = ref<CheckboxOptionType[]>([])

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
      }, [] as CheckboxOptionType[])

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

    watch(
      () => props.immediate,
      value => {
        value && !isLoaded.value && fetchData()
      }
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

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    function handleChange(checkedValue: Array<CheckboxValueType>) {
      const checkedOption = unref(getOptions).filter(item => checkedValue.includes(item.value))
      emitData.value = checkedOption
    }

    return () => (
      <Spin spinning={unref(loading)}>
        <Checkbox.Group {...attrs} v-model:value={state} options={unref(getOptions)} onChange={handleChange} />
      </Spin>
    )
  }
})
