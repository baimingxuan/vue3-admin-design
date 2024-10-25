import type { PropType } from 'vue'
import type { RadioChangeEvent } from 'ant-design-vue'
import type { RadioGroupChildOption } from 'ant-design-vue/es/radio/Group'
import { defineComponent, ref, computed, unref, watch, onMounted } from 'vue'
import { Radio, Spin } from 'ant-design-vue'
import { get, omit } from 'lodash-es'
import { isFunction, isArray } from '@/utils/is'
import { useBindValue } from '../hooks/useBindValue'

export default defineComponent({
  name: 'ApiRadioGroup',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number] as PropType<string | number>
    },
    options: {
      type: Array as PropType<Array<RadioGroupChildOption>>,
      default: []
    },
    api: {
      type: Function as PropType<(arg?: any) => Promise<RadioGroupChildOption[]>>
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
    const optionsRef = ref<RadioGroupChildOption[]>([])

    const loading = ref(false)
    const isLoaded = ref(false)
    const emitData = ref<RadioGroupChildOption[]>([])

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
      }, [] as RadioGroupChildOption[])

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

    function handleChange(event: RadioChangeEvent) {
      const checkedVal = event.target.value
      const checkedOption = unref(getOptions).find(item => item.value === checkedVal)
      emitData.value = checkedOption ? [checkedOption] : []
    }

    return () => (
      <Spin spinning={unref(loading)}>
        <Radio.Group {...attrs} v-model:value={state} options={unref(getOptions)} onChange={handleChange} />
      </Spin>
    )
  }
})
