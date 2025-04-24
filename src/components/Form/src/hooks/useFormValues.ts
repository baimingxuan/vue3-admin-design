import type { Ref, ComputedRef } from 'vue'
import type { FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { unref } from 'vue'
import { cloneDeep, get, set, unset } from 'lodash-es'
import { isArray, isFunction, isEmpty, isObject, isString, isNil } from '@/utils/is'
import { dateUtil } from '@/utils/dateUtil'
import { tryDeconstructArray, tryDeconstructObject } from '../helper'

interface FormValueCtx {
  getFormProps: ComputedRef<FormPropsType>
  getFormSchemas: ComputedRef<FormSchemaType[]>
  formModel: Recordable
  formDefaultVal: Ref<Recordable>
}

export function useFormValues({ getFormProps, getFormSchemas, formModel, formDefaultVal }: FormValueCtx) {
  function initDefaultValue() {
    const schemas = unref(getFormSchemas)
    const defaultObj: Recordable = {}

    schemas.forEach(item => {
      const { defaultValue, defaultValueObj } = item
      const fieldKeys = Object.keys(defaultValueObj || {})

      if (fieldKeys.length) {
        fieldKeys.map(field => {
          defaultObj[field] = defaultValueObj![field]
          if (formModel[field] === undefined) {
            formModel[field] = defaultValueObj![field]
          }
        })
      }

      if (!isNil(defaultValue)) {
        defaultObj[item.field] = defaultValue

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue
        }
      }
    })

    formDefaultVal.value = cloneDeep(defaultObj)
  }

  function _formatTime(time: string, format: string) {
    if (format === 'timestamp') {
      return dateUtil(time).unix()
    } else if (format === 'timestampStartDay') {
      return dateUtil(time).startOf('day').unix()
    }
    return dateUtil(time).format(format)
  }

  function _handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = unref(getFormProps).fieldMapToTime

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey) {
        continue
      }

      // If the value to be converted is empty, remove the field
      if (!get(values, field)) {
        unset(values, field)
        continue
      }

      const [startTime, endTime]: string[] = get(values, field)

      const [startTimeFormat, endTimeFormat] = Array.isArray(format) ? format : [format, format]

      if (!isNil(startTime) && !isEmpty(startTime)) {
        set(values, startTimeKey, _formatTime(startTime, startTimeFormat))
      }
      if (!isNil(endTime) && !isEmpty(endTime)) {
        set(values, endTimeKey, _formatTime(endTime, endTimeFormat))
      }
      unset(values, field)
    }

    return values
  }

  function handleFormValues(values: Recordable) {
    if (!isObject(values)) return {}

    const ret: Recordable = {}

    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue
      }
      const transformDateFunc = unref(getFormProps).transformDateFunc
      if (isObject(value)) {
        value = transformDateFunc?.(value)
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map(item => transformDateFunc?.(item))
      }

      if (isString(value)) {
        value = value.trim()
      }

      if (!tryDeconstructArray(key, value, ret) && !tryDeconstructObject(key, value, ret)) {
        set(ret, key, value)
      }
    }
    return _handleRangeTimeValue(ret)
  }

  return {
    initDefaultValue,
    handleFormValues
  }
}
