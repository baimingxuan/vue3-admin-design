import type { Ref, ComputedRef } from 'vue'
import type { FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { unref } from 'vue'
import { isArray, isFunction, isObject, isString, isNil } from '@/utils/is'
import { cloneDeep } from 'lodash-es'

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

  return {
    initDefaultValue
  }
}
