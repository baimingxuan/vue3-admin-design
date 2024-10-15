import type { Ref, ComputedRef } from 'vue'
import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { unref, toRaw, nextTick } from 'vue'
import { isArray, isObject, isFunction, isDef } from '@/utils/is'
import { handleInputNumberValue, tryConstructArray, tryConstructObject } from '../helper'
import { INPUT_COMPONENTS, DATE_COMPONENTS } from '../constant'
import { cloneDeep, set, uniqBy, get } from 'lodash-es'
import { dateUtil } from '@/utils/dateUtil'

interface FormEventCtx {
  emit: EmitType
  getFormProps: ComputedRef<FormPropsType>
  getFormSchemas: ComputedRef<FormSchemaType[]>
  formModel: Recordable
  formDefaultVal: Ref<Recordable>
  formSchemas: Ref<FormSchemaType[]>
  formElRef: Ref<FormRefType>
  handleFormValues: Fn
}

function getFormDefaultVal(
  schema: FormSchemaType | undefined,
  formDefaultVal: FormEventCtx['formDefaultVal'],
  key: string
) {
  let defaultVal = cloneDeep(formDefaultVal.value[key])

  if (schema?.component && INPUT_COMPONENTS.includes(schema.component)) {
    return defaultVal || undefined
  }

  if (
    !defaultVal &&
    schema &&
    schema.component === 'Slider' &&
    schema.componentProps &&
    'range' in schema.componentProps
  ) {
    defaultVal = [0, 0]
  }

  if (!defaultVal && schema && schema.component === 'ApiTree') {
    defaultVal = []
  }

  return defaultVal
}

export function useFormEvents({
  emit,
  getFormProps,
  getFormSchemas,
  formModel,
  formDefaultVal,
  formSchemas,
  formElRef,
  handleFormValues
}: FormEventCtx) {
  function getFormAllFields() {
    return unref(getFormSchemas)
      .map(item => [...(item.fields || []), item.field])
      .flat()
      .filter(Boolean)
  }

  async function validateFields(nameList?: NamePath[] | undefined) {
    const values = await unref(formElRef)?.validateFields(nameList)
    return handleFormValues(values)
  }

  async function validateForm(nameList?: NamePath[] | false | undefined) {
    let _nameList: any

    if (nameList === undefined) {
      _nameList = getFormAllFields()
    } else {
      _nameList = nameList === isArray(nameList) ? nameList : undefined
    }

    const values = await unref(formElRef)?.validateForm(_nameList)

    return handleFormValues(values)
  }

  async function submitForm(): Promise<void> {
    const { submitFunc } = unref(getFormProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      return
    }

    if (!unref(formElRef)) return

    try {
      const values = await validateForm()
      emit('submit', values)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function resetFields(): Promise<void> {
    const { resetFunc } = unref(getFormProps)
    if (resetFunc && isFunction(resetFunc)) {
      await resetFunc()
      return
    }

    if (!unref(formElRef)) return

    Object.keys(formModel).forEach(key => {
      const schema = unref(getFormSchemas).find(item => item.field === key)
      const defaultValueObj = schema?.defaultValueObj
      const fieldKeys = Object.keys(defaultValueObj || {})
      if (fieldKeys.length) {
        fieldKeys.map(field => {
          formModel[field] = defaultValueObj![field]
        })
      }
      formModel[key] = getFormDefaultVal(schema, formDefaultVal, key)
    })

    nextTick(() => clearValidate())

    emit('reset', toRaw(formModel))
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef)?.clearValidate(name)
  }

  async function scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
    await unref(formElRef)?.scrollToField(name, options)
  }

  async function resetSchemas(schema: Partial<FormSchemaType> | Partial<FormSchemaType>[]) {
    let updateSchemas: Partial<FormSchemaType>[] = []

    if (isArray(schema)) {
      updateSchemas = [...schema]
    } else if (isObject(schema)) {
      updateSchemas.push(schema)
    }

    const hasField = updateSchemas.every(item => Reflect.has(item, 'field') && item.field)

    if (!hasField) {
      new Error('All children of the form Schema array must contain the `field` field')
      return
    }

    formSchemas.value = updateSchemas as FormSchemaType[]
  }

  function itemIsDateType(key: string) {
    return unref(getFormSchemas).some(item => {
      return item.field === key && item.component ? [...DATE_COMPONENTS, 'RangePicker'].includes(item.component) : false
    })
  }

  async function setFieldsValues(values: Recordable): Promise<void> {
    if (Object.keys(values).length === 0) return

    const fields = getFormAllFields()

    // key 支持 a.b.c 的嵌套写法
    const delimiter = '.'
    const nestKeyArray = fields.filter(item => String(item).indexOf(delimiter) >= 0)

    const validKeys: string[] = []
    fields.forEach(key => {
      const schema = unref(getFormSchemas).find(item => item.field === key)
      let value = get(values, key)
      const hasKey = Reflect.has(values, key)

      value = handleInputNumberValue(schema?.component, value)
      const { componentProps } = schema || {}
      let _props = componentProps as any
      if (isFunction(componentProps)) {
        _props = _props({
          formModel: unref(formModel),
          formElRef
        })
      }

      const constructValue = tryConstructArray(key, values) || tryConstructObject(key, values)

      // 0| '' is allow
      if (hasKey || !!constructValue) {
        const fieldValue = constructValue || value
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(fieldValue)) {
            const arr: any[] = []
            for (const ele of fieldValue) {
              arr.push(ele ? dateUtil(ele) : null)
            }
            unref(formModel)[key] = arr
          } else {
            unref(formModel)[key] = fieldValue ? (_props?.valueFormat ? fieldValue : dateUtil(fieldValue)) : null
          }
        } else {
          unref(formModel)[key] = fieldValue
        }
        if (_props?.onChange) {
          _props?.onChange(fieldValue)
        }
        validKeys.push(key)
      } else {
        nestKeyArray.forEach((nestKey: string) => {
          try {
            const value = nestKey.split('.').reduce((out, item) => out[item], values)
            if (isDef(value)) {
              unref(formModel)[nestKey] = unref(value)
              validKeys.push(nestKey)
            }
          } catch (e) {
            // key not exist
            if (isDef(formDefaultVal.value[nestKey])) {
              unref(formModel)[nestKey] = cloneDeep(unref(formDefaultVal.value[nestKey]))
            }
          }
        })
      }
    })
    validateFields(validKeys).catch(_ => {})
  }

  return {
    submitForm,
    validateForm,
    resetFields,
    validateFields,
    clearValidate,
    scrollToField,
    resetSchemas,
    setFieldsValues
  }
}
