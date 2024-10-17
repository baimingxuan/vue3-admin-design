import type { Ref, ComputedRef } from 'vue'
import type { FormPropsType, FormSchemaInnerType as FormSchemaType, ColPropsType, AdvanceType } from '../types/form'
import { shallowReactive, computed, unref, watch, getCurrentInstance } from 'vue'
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

  function getAdvanced(itemCol: Partial<ColPropsType>, itemColSum = 0, isLastAction = false) {
    itemColSum += (itemCol.span as number) || 0

    if (itemColSum > BASIC_COL_LEN * (unref(getFormProps).alwaysShowRows || 1)) {
      return { isAdvanced: advanceState.isAdvanced, itemColSum }
    } else {
      // The first line is always displayed
      return { isAdvanced: true, itemColSum }
    }
  }

  function updateAdvanced() {
    let itemColSum = 0
    let realItemColSum = 0
    const { colProps: baseColProps } = unref(getFormProps)

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

      if (itemIsRender && itemIsShow && (baseColProps || colProps)) {
        const { itemColSum: colSum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)

        itemColSum = colSum || 0
        if (isAdvanced) {
          realItemColSum = itemColSum
        }
        fieldsIsAdvancedMap[schema.field] = isAdvanced
      }
    }

    vm?.proxy?.$forceUpdate()
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  return { handleToggleAdvanced, fieldsIsAdvancedMap }
}
