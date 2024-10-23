import type { PropType } from 'vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { SelectOptionsType } from '../types'
import { defineComponent, ref, computed, unref, watch } from 'vue'
import { Select } from 'ant-design-vue'
import { get, omit, isEqual } from 'lodash-es'
import { isFunction } from '@/utils/is'
import { useFormItemRule } from '../hooks/useFormItemRule'

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
      type: Function as PropType<(arg?: any) => Promise<SelectOptionsType[]>>,
      default: null
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
    const isFirstLoaded = ref(false)
    const emitData = ref<SelectOptionsType[]>([])

    const [state] = useFormItemRule(props, 'value', 'change', emitData)

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

    watch(
      () => state.value,
      value => {
        emit('update:value', value)
      }
    )

    watch(
      () => props.params,
      (value, oldValue) => {
        if (isEqual(value, oldValue)) return
        fetchData()
      },
      { deep: true, immediate: props.immediate }
    )

    async function fetchData() {
      const request = props.api

      if (!request || !isFunction(request) || loading.value) return

      optionsRef.value = []

      try {
        loading.value = true
        const res = await request(props.params)
        isFirstLoaded.value = true

        if (Array.isArray(res)) {
          optionsRef.value = res
          emitChange()
          return
        }

        if (props.resultField) {
          optionsRef.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
        isFirstLoaded.value = false
      }
    }

    async function handleFetch(visible: boolean) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetchData()
        } else if (!props.immediate && !unref(isFirstLoaded)) {
          await fetchData()
        }
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
        v-slots={{ ...slots }}
        onDropdownVisibleChange={handleFetch}
        onChange={handleChange}
      />
    )
  }
})
