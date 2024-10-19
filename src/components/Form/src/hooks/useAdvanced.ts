import type { Ref, ComputedRef } from 'vue'
import type { FormPropsType, FormSchemaInnerType as FormSchemaType, AdvanceType } from '../types/form'
import { shallowReactive, unref, watch, getCurrentInstance } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { isBoolean, isFunction } from '@/utils/is'

interface AdvancedParamType {
  advanceState: AdvanceType
  getFormProps: ComputedRef<FormPropsType>
  getFormSchemas: ComputedRef<FormSchemaType[]>
  formModel: Recordable
  formDefaultVal: Ref<Recordable>
}

const BASIC_COL_LEN = 24

export function useAdvanced({
  advanceState,
  getFormProps,
  getFormSchemas,
  formModel,
  formDefaultVal
}: AdvancedParamType) {
  const vm = getCurrentInstance()
  const fieldsIsAdvancedMap = shallowReactive({})
  const minActionColSpan = 4

  const debounceUpdateAdvanced = useDebounceFn(updateAdvanced, 30)

  watch(
    [() => unref(getFormSchemas), () => advanceState.isAdvanced],
    () => {
      const { showAdvancedBtn } = unref(getFormProps)
      if (showAdvancedBtn) {
        debounceUpdateAdvanced()
      }
    },
    { immediate: true }
  )

  function updateAdvanced() {
    const { colProps: baseColProps, actionColProps } = unref(getFormProps)
    const actionColSpanLen = advanceState.actionColSpan || (actionColProps?.span as number) || 0
    let colSpanSum = minActionColSpan
    let advancedSpan = 0

    for (const schema of unref(getFormSchemas)) {
      const { isRender, isShow, colProps } = schema

      const itemIsRender = isFunction(isRender)
        ? isRender(
            unref({
              schema,
              model: formModel,
              field: schema.field,
              values: {
                ...unref(formDefaultVal),
                ...formModel
              }
            })
          )
        : isBoolean(isRender)
          ? isRender
          : true

      const itemIsShow = isFunction(isShow)
        ? isShow({
            schema,
            model: formModel,
            field: schema.field,
            values: {
              ...unref(formDefaultVal),
              ...formModel
            }
          })
        : isBoolean(isShow)
          ? isShow
          : true

      if (itemIsRender && itemIsShow && (colProps || baseColProps)) {
        colSpanSum += (colProps?.span || baseColProps?.span) as number

        if (colSpanSum <= BASIC_COL_LEN) {
          advancedSpan = colSpanSum
          fieldsIsAdvancedMap[schema.field] = true
        } else {
          fieldsIsAdvancedMap[schema.field] = advanceState.isAdvanced
        }
      }
    }
    console.log('advancedSpan', colSpanSum, advancedSpan)

    vm?.proxy?.$forceUpdate()

    if (colSpanSum <= BASIC_COL_LEN) {
      advanceState.isAdvanced = true
      advanceState.hideAdvanceBtn = true
      advanceState.actionColSpan = BASIC_COL_LEN - advancedSpan + actionColSpanLen
    } else {
      advanceState.hideAdvanceBtn = false

      if (!advanceState.isAdvanced) {
        advanceState.actionColSpan = BASIC_COL_LEN - advancedSpan + minActionColSpan
        console.log('111', advanceState.actionColSpan)
      } else {
        advanceState.actionColSpan = BASIC_COL_LEN - ((colSpanSum - minActionColSpan) % BASIC_COL_LEN)
        console.log('222', advanceState.actionColSpan)
      }
    }

    // console.log('advanceState', advanceState.actionColSpan)
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  return { handleToggleAdvanced, fieldsIsAdvancedMap }
}
