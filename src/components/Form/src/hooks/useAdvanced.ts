import type { Ref, ComputedRef } from 'vue'
import type { FormPropsType, FormSchemaInnerType as FormSchemaType, AdvanceType } from '../types/form'
import { shallowReactive, unref, watch, getCurrentInstance } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { isBoolean, isFunction } from '@/utils/is'
import { BASIC_COL_LEN, MINI_ACTION_COL_LEN } from '../constant'

interface AdvancedParamType {
  advanceState: AdvanceType
  getFormProps: ComputedRef<FormPropsType>
  getFormSchemas: ComputedRef<FormSchemaType[]>
  formModel: Recordable
  formDefaultVal: Ref<Recordable>
}

export function useAdvanced({
  advanceState,
  getFormProps,
  getFormSchemas,
  formModel,
  formDefaultVal
}: AdvancedParamType) {
  const vm = getCurrentInstance()
  const fieldsIsAdvancedMap = shallowReactive({})

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
    let colSpanSum = MINI_ACTION_COL_LEN
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

    vm?.proxy?.$forceUpdate()

    if (colSpanSum <= BASIC_COL_LEN) {
      advanceState.isAdvanced = true
      advanceState.hideAdvanceBtn = true
      advanceState.actionColSpan = BASIC_COL_LEN - advancedSpan + actionColSpanLen
    } else {
      advanceState.hideAdvanceBtn = false

      if (advanceState.isAdvanced) {
        advanceState.actionColSpan = BASIC_COL_LEN - ((colSpanSum - MINI_ACTION_COL_LEN) % BASIC_COL_LEN)
      } else {
        advanceState.actionColSpan = BASIC_COL_LEN - advancedSpan + MINI_ACTION_COL_LEN
      }
    }
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  return { handleToggleAdvanced, fieldsIsAdvancedMap }
}
