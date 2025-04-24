import type { PropType, CSSProperties } from 'vue'
import type { EditColumnType } from '../../types/table'
import { defineComponent, ref, unref, computed, toRaw, nextTick, watchEffect } from 'vue'
import { Spin, FormItem } from 'ant-design-vue'
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons-vue'
import { isArray, isBoolean, isFunction, isNumber, isString } from '@/utils/is'
import { treeToList } from '@/utils/helper/treeHelper'
import clickOutside from '@/directives/clickOutside'
import { pick, set } from 'lodash-es'
import { generatePlaceholder } from '../../helper'
import { compoMap } from '../../compoMap'
import { useTableContext } from '../../hooks/useTableContext'
import styles from './index.module.less'

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
  setup(props) {
    const table = useTableContext()
    const elRef = ref<Nullable<HTMLElement>>(null)
    const isEdit = ref<boolean>(false)
    const spinning = ref<boolean>(false)
    const currentValueRef = ref(props.value)
    const defaultValueRef = ref(props.value)
    const optionsRef = ref<LabelValueOptions>([])

    const getComponent = computed(() => props.column?.editComponent || 'Input')
    // const getRule = computed(() => props.column?.editRule)

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

    const getIsCheckComp = computed(() => {
      const component = unref(getComponent)
      return ['Checkbox', 'Switch'].includes(component)
    })

    const getWrapperStyle = computed((): CSSProperties => {
      if (unref(getIsCheckComp) || unref(getRowEditable)) {
        return {}
      }
      return {
        width: 'calc(100% - 48px)'
      }
    })

    const getWrapperClass = computed(() => {
      const { align = 'center' } = props.column
      return `edit-cell-align-${align}`
    })

    const getRowEditable = computed(() => {
      const { editable } = props.record || {}
      return !!editable
    })

    function updateDynamicDisabled(record, column, value) {
      if (!record) return false
      const { key, dataIndex } = column
      if (!key && !dataIndex) return
      const dataKey = (dataIndex || key) as string
      set(record, dataKey, value)
    }

    watchEffect(() => {
      currentValueRef.value = props.value
    })

    watchEffect(() => {
      const { editable } = props.column
      if (isBoolean(editable) || isBoolean(unref(getRowEditable))) {
        isEdit.value = !!editable || unref(getRowEditable)
      }
    })

    async function handleChange(e: any) {
      const component = unref(getComponent)
      if (!e) {
        currentValueRef.value = e
      } else if (component === 'Checkbox') {
        currentValueRef.value = (e as ChangeEvent).target.checked
      } else if (component === 'Switch') {
        currentValueRef.value = e
      } else if (e?.target && Reflect.has(e.target, 'value')) {
        currentValueRef.value = (e as ChangeEvent).target.value
      } else if (isString(e) || isBoolean(e) || isNumber(e) || isArray(e)) {
        currentValueRef.value = e
      }
      const onChange = unref(getComponentProps)?.onChangeTemp
      if (onChange && isFunction(onChange)) onChange(...arguments)

      table.emit?.('edit-change', {
        column: props.column,
        value: unref(currentValueRef),
        record: toRaw(props.record)
      })
      // handleSubmitRule()
    }

    async function handleEnter() {
      if (props.column?.editRow) {
        return
      }
      handleSubmit()
    }

    async function handleSubmit(needEmit = true, valid = true) {
      // if (valid) {
      //   const isPass = await handleSubmitRule()
      //   if (!isPass) return false
      // }

      const { column, index, record } = props
      if (!record) return false
      const { key, dataIndex } = column
      const value = unref(currentValueRef)
      if (!key && !dataIndex) return

      const dataKey = (dataIndex || key) as string

      if (!record.editable) {
        const { getBindValues } = table

        const { beforeEditSubmit, columns } = unref(getBindValues)

        if (beforeEditSubmit && isFunction(beforeEditSubmit)) {
          spinning.value = true
          const keys: string[] = columns.map(_column => _column.dataIndex).filter(field => !!field) as string[]
          let result: any = true
          try {
            result = await beforeEditSubmit({
              record: pick(record, keys),
              index: index!,
              key: dataKey as string,
              value
            })
          } catch (e) {
            result = false
          } finally {
            spinning.value = false
          }
          if (result === false) {
            return
          }
        }
      }

      set(record, dataKey, value)
      //const record = await table.updateTableData(index, dataKey, value);
      needEmit && table.emit?.('edit-end', { record, index, key: dataKey, value })
      isEdit.value = false
    }

    function handleCancel() {
      isEdit.value = false
      currentValueRef.value = defaultValueRef.value
      const { column, index, record } = props
      const { key, dataIndex } = column
      table.emit?.('edit-cancel', {
        record,
        index,
        key: dataIndex || key,
        value: unref(currentValueRef)
      })
    }

    function handleEdit() {
      if (unref(getRowEditable) || unref(props.column?.editRow)) return
      isEdit.value = true
      nextTick(() => {
        const el = unref(elRef)
        el?.focus?.()
      })
    }

    function onClickOutside() {
      if (props.column?.editable || unref(getRowEditable)) {
        return
      }
      const component = unref(getComponent)

      if (component.includes('Input')) {
        handleCancel()
      }
    }

    // only ApiSelect or TreeSelect
    function handleOptionsChange(options: LabelValueOptions) {
      const { replaceFields } = unref(getComponentProps)
      const component = unref(getComponent)
      if (component === 'ApiTreeSelect') {
        const { title = 'title', value = 'value', children = 'children' } = replaceFields || {}
        let listOptions: Recordable[] = treeToList(options, { children })
        listOptions = listOptions.map(item => {
          return {
            label: item[title],
            value: item[value]
          }
        })
        optionsRef.value = listOptions as LabelValueOptions
      } else {
        optionsRef.value = options
      }
    }

    function initCbs(cbs: 'submitCbs' | 'validCbs' | 'cancelCbs', handle: Fn) {
      if (props.record) {
        /* eslint-disable  */
        isArray(props.record[cbs])
          ? props.record[cbs]?.push(handle)
          : (props.record[cbs] = [handle]);
      }
    }

    if (props.record) {
      initCbs('submitCbs', handleSubmit);
      // initCbs('validCbs', handleSubmitRule);
      initCbs('cancelCbs', handleCancel);

      if (props.column.dataIndex) {
        if (!props.record.editValueRefs) props.record.editValueRefs = {};
        props.record.editValueRefs[props.column.dataIndex as any] = currentValueRef;
      }
      /* eslint-disable  */
      props.record.onCancelEdit = () => {
        isArray(props.record?.cancelCbs) && props.record?.cancelCbs.forEach((fn) => fn());
      };
      /* eslint-disable */
      props.record.onSubmitEdit = async () => {
        if (isArray(props.record?.submitCbs)) {
          if (!props.record?.onValid?.()) return;
          const submitFns = props.record?.submitCbs || [];
          submitFns.forEach((fn) => fn(false, false));
          table.emit?.('edit-row-end');
          return true;
        }
      };
    }

    return () => {
      const CellComponent = compoMap.get(unref(getComponent)) as ReturnType<typeof defineComponent>

      return (
        <div class={styles['editable-cell']}>
          {unref(isEdit) ? (
            <Spin spinning={unref(spinning)}>
              <div class={styles['editable-cell__wrapper']} v-click-outside={onClickOutside}>
                <FormItem>
                  <CellComponent
                    {...unref(getComponentProps)}
                    style={unref(getWrapperStyle)}
                    class={unref(getWrapperClass)}
                    ref={elRef}
                    onChange={handleChange}
                    onOptionChange={handleOptionsChange}
                    onPressEnter={handleEnter}
                  />
                </FormItem>
                {!unref(getRowEditable) && (
                  <div class={styles['editable-cell__action']}>
                    <CheckOutlined class={styles['editable-cell__action-icon']} onClick={handleSubmit} />
                    <CloseOutlined class={styles['editable-cell__action-icon']} onClick={handleCancel} />
                  </div>
                )}
              </div>
            </Spin>
          ) : (
            <div
              class={[styles['editable-cell__normal'], { [styles['ellipsis-cell']]: props.column.ellipsis }]}
              onClick={handleEdit}
            >
              <div class={styles['cell-content']} title={props.column.ellipsis ? (unref(getValues) ?? '') : ''}>
                {props.column.editRender
                  ? props.column.editRender({
                      text: props.value!,
                      record: props.record as Recordable,
                      column: props.column,
                      index: props.index!
                    })
                  : (unref(getValues) ?? '\u00A0')}
              </div>
              {!props.column.editRow && <FormOutlined class={styles['editable-cell__normal-icon']} />}
            </div>
          )}
        </div>
      )
    }
  }
})
