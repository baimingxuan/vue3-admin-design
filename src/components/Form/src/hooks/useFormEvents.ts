import type { Ref, ComputedRef } from 'vue'
import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from '../types/form'
import { unref, toRaw, nextTick } from 'vue'
import { isArray, isObject, isFunction } from '@/utils/is'
import { INPUT_COMPONENTS } from '../constant'
import { cloneDeep } from 'lodash-es'

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

  return {
    submitForm,
    validateForm,
    resetFields,
    validateFields,
    clearValidate,
    scrollToField,
    resetSchemas
  }
}
