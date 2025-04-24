import type { Ref, ComputedRef } from 'vue'
import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { FormInstance } from 'ant-design-vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { unref, toRaw, nextTick } from 'vue'
import { deepMerge } from '@/utils'
import { isArray, isObject, isFunction, isDef, isString, isNil } from '@/utils/is'
import { handleInputNumberValue, tryConstructArray, tryConstructObject } from '../helper'
import { INPUT_COMPONENTS, DATE_COMPONENTS } from '../constant'
import { cloneDeep, uniqBy, get } from 'lodash-es'
import { dateUtil } from '@/utils/dateUtil'

interface FormEventCtx {
  emit: EmitType
  getFormProps: ComputedRef<FormPropsType>
  getFormSchemas: ComputedRef<FormSchemaType[]>
  formModel: Recordable
  formDefaultVal: Ref<Recordable>
  formSchemas: Ref<FormSchemaType[]>
  formElRef: Ref<FormInstance>
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
  function _getFormAllFields() {
    return unref(getFormSchemas)
      .map(item => [...(item.fields || []), item.field])
      .flat()
      .filter(Boolean)
  }

  function _setDefaultValue(data: FormSchemaType | FormSchemaType[]) {
    let schemas: FormSchemaType[] = []
    if (isObject(data)) {
      schemas.push(data as FormSchemaType)
    }
    if (isArray(data)) {
      schemas = [...data]
    }

    const obj: Recordable = {}
    const currentFieldsValue = getFieldsValues()
    schemas.forEach(item => {
      if (
        Reflect.has(item, 'field') &&
        item.field &&
        !isNil(item.defaultValue) &&
        (!(item.field in currentFieldsValue) || isNil(currentFieldsValue[item.field]))
      ) {
        obj[item.field] = item.defaultValue
      }
    })
    setFieldsValues(obj)
  }

  function _isDateType(key: string) {
    return unref(getFormSchemas).some(item => {
      return item.field === key && item.component ? [...DATE_COMPONENTS, 'RangePicker'].includes(item.component) : false
    })
  }

  function _removeSchemaByField(field: string, schemaList: FormSchemaType[]): void {
    if (isString(field)) {
      const index = schemaList.findIndex(schema => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        schemaList.splice(index, 1)
      }
    }
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

  async function validateForm(nameList?: NamePath[] | false | undefined) {
    let _nameList: any

    if (nameList === undefined) {
      _nameList = _getFormAllFields()
    } else {
      _nameList = nameList === isArray(nameList) ? nameList : undefined
    }

    const values = await unref(formElRef)?.validate(_nameList)

    return handleFormValues(values)
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

  async function validateFields(nameList?: NamePath[] | undefined) {
    const values = await unref(formElRef)?.validateFields(nameList)
    return handleFormValues(values)
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef)?.clearValidate(name)
  }

  async function scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
    await unref(formElRef)?.scrollToField(name, options)
  }

  async function updateSchemas(data: Partial<FormSchemaType> | Partial<FormSchemaType>[]) {
    let updateData: Partial<FormSchemaType>[] = []
    if (isObject(data)) {
      updateData.push(data as FormSchemaType)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(item => Reflect.has(item, 'field') && item.field)

    if (!hasField) {
      new Error('All children of the form Schema array that need to be updated must contain the `field` field')
      return
    }
    const schema: FormSchemaType[] = []
    const updatedSchema: FormSchemaType[] = []
    unref(getFormSchemas).forEach(val => {
      const updatedItem = updateData.find(item => val.field === item.field)

      if (updatedItem) {
        const newSchema = deepMerge(val, updatedItem)
        updatedSchema.push(newSchema as FormSchemaType)
        schema.push(newSchema as FormSchemaType)
      } else {
        schema.push(val)
      }
    })
    _setDefaultValue(updatedSchema)

    formSchemas.value = uniqBy(schema, 'field')
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

  async function setFieldsValues(values: Recordable): Promise<void> {
    if (Object.keys(values).length === 0) return

    const fields = _getFormAllFields()

    // Key supports nested writing of a.b.c
    const nestKeyArray = fields.filter(item => String(item).indexOf('.') >= 0)

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
          schema,
          formModel: unref(formModel),
          formRef
        })
      }

      const constructValue = tryConstructArray(key, values) || tryConstructObject(key, values)

      // 0 | '' is allow
      if (hasKey || !!constructValue) {
        const fieldValue = constructValue || value
        // time type
        if (_isDateType(key)) {
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

  function getFieldsValues(): Recordable {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function appendSchemaByField(schema: FormSchemaType | FormSchemaType[], prefixField?: string, first = false) {
    const schemaList: FormSchemaType[] = cloneDeep(unref(getFormSchemas))
    const addSchemaIds: string[] = Array.isArray(schema) ? schema.map(item => item.field) : [schema.field]
    if (schemaList.find(item => addSchemaIds.includes(item.field))) {
      new Error('There are schemas that have already been added')
      return
    }
    const index = schemaList.findIndex(schema => schema.field === prefixField)
    const _schemaList = isObject(schema) ? [schema as FormSchemaType] : (schema as FormSchemaType[])
    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(..._schemaList) : schemaList.push(..._schemaList)
    } else if (index !== -1) {
      schemaList.splice(index + 1, 0, ..._schemaList)
    }
    formSchemas.value = schemaList
    _setDefaultValue(schema)
  }

  async function removeSchemaByField(fields: string | string[]): Promise<void> {
    const schemaList: FormSchemaType[] = cloneDeep(unref(getFormSchemas))
    if (!fields) return

    let fieldList: string[] = isString(fields) ? [fields] : fields
    if (isString(fields)) {
      fieldList = [fields]
    }
    for (const field of fieldList) {
      _removeSchemaByField(field, schemaList)
    }
    formSchemas.value = schemaList
  }

  const formRef: Partial<FormRefType> = {
    submitForm,
    validateForm,
    resetFields,
    validateFields,
    clearValidate,
    scrollToField,
    updateSchemas,
    resetSchemas,
    setFieldsValues,
    getFieldsValues,
    appendSchemaByField,
    removeSchemaByField
  }

  return {
    submitForm,
    validateForm,
    resetFields,
    validateFields,
    clearValidate,
    scrollToField,
    updateSchemas,
    resetSchemas,
    setFieldsValues,
    getFieldsValues,
    appendSchemaByField,
    removeSchemaByField
  }
}
