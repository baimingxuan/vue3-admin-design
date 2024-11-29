import type { PropType, CSSProperties } from 'vue'
import type { EditColumnType } from '../types/table'
import { defineComponent, ref, unref, computed, toRaw, nextTick, watchEffect } from 'vue'
import { Spin, Popover } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons-vue'
import { isArray, isBoolean, isFunction, isNumber, isString } from '@/utils/is'
import clickOutside from '@/directives/clickOutside'
import { pick, set } from 'lodash-es'
import { generatePlaceholder } from '../helper'
import { compoMap } from '../compoMap'

export default defineComponent({
  name: 'EditableCell',
  props: {
    value: {
      type: [String, Number, Boolean, Object] as PropType<string | number | boolean | Record<string, any>>
    },
    index: {
      type: Number as PropType<number>
    },
    record: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    column: {
      type: Object as PropType<EditColumnType>,
      default: () => ({})
    }
  },
  directives: {
    clickOutside
  },
  setup(props, { emit }) {
    const elRef = ref(null)
    const isEdit = ref<boolean>(false)
    const spinning = ref<boolean>(false)
    const currentValueRef = ref(props.value)
    const defaultValueRef = ref(props.value)
    const optionsRef = ref([])

    const getComponent = computed(() => props.column?.editComponent || 'Input')
    const getRule = computed(() => props.column?.editRule)

    const getIsCheckCompo = computed(() => {
      const component = unref(getComponent)
      return ['Checkbox', 'Switch'].includes(component)
    })

    const getComponentProps = computed(() => {
      const isCheckValue = unref(getIsCheckCompo)
      let compoProps = props.column?.editComponentProps ?? ({} as any)
      const { checkedValue, unCheckedValue } = compoProps

      const valueField = isCheckValue ? 'checked' : 'value'
      const val = unref(currentValueRef)

      let value = val
      if (isCheckValue) {
        if (typeof checkedValue !== 'undefined') {
          value = val === checkedValue ? checkedValue : unCheckedValue
        } else if (typeof unCheckedValue !== 'undefined') {
          value = val === unCheckedValue ? unCheckedValue : checkedValue
        } else {
          value = isNumber(val) || isBoolean(val) ? val : !!val
        }
      }

      const { record, column, index } = props

      if (isFunction(compoProps)) {
        compoProps = compoProps({ text: val, record, column, index }) ?? {}
      }

      // Store the onChange method in a temporary variable for handleChange method fetch, and delete the original onChange to prevent two Onchanges.
      compoProps.onChangeTemp = compoProps.onChange
      delete compoProps.onChange

      const component = unref(getComponent)
      const apiSelectProps: Record<string, any> = {}
      if (component === 'ApiSelect') {
        apiSelectProps.cache = true
      }

      updateDynamicDisabled(record, column, value)

      return {
        size: 'small',
        placeholder: generatePlaceholder(unref(getComponent)),
        ...apiSelectProps,
        ...compoProps,
        [valueField]: value,
        disabled: unref(getDisabled)
      } as any
    })

    const getValues = computed(() => {
      const { editValueMap } = props.column

      const value = unref(currentValueRef)

      if (editValueMap && isFunction(editValueMap)) {
        return editValueMap(value)
      }

      const component = unref(getComponent)
      if (!component.includes('Select') && !component.includes('Radio')) {
        return value
      }

      const options = unref(getComponentProps)?.options ?? (unref(optionsRef) || [])
      const option = options.find(item => `${item.value}` === `${value}`)

      return option?.label ?? value
    })

    const getDisabled = computed(() => {
      const { dynamicDisabled } = props.column
      let disabled = false
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        const { record } = props
        disabled = dynamicDisabled({ record, currentValue: currentValueRef.value })
      }
      return disabled
    })

    function updateDynamicDisabled(record, column, value) {
      if (!record) return false
      const { key, dataIndex } = column
      if (!key && !dataIndex) return
      const dataKey = (dataIndex || key) as string
      set(record, dataKey, value)
    }

    const getRowEditable = computed(() => {
      const { editable } = props.record || {}
      return !!editable
    })

    watchEffect(() => {
      const { editable } = props.column
      if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
        isEdit.value = !!editable || unref(getRowEditable)
      }
    })

    return () => {
      const CellComponent = compoMap.get(unref(getComponent)) as typeof defineComponent

      return <div class='editable-cell'></div>
    }
  }
})
