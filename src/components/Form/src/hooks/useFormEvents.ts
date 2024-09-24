import type { Ref } from 'vue'
import type { FormRefType } from '../types'
import type { FormSchemaType } from '../types'
import { unref, toRaw, nextTick } from 'vue'

interface FormEventCtx {
  emit: EmitType
  schemas: FormSchemaType[]
  formModel: Recordable
  formElRef: Ref<Nullable<FormRefType>>
}

export function useFormEvents({ emit, schemas, formModel, formElRef }: FormEventCtx) {
  async function submitForm(): Promise<void> {
    if (!unref(formElRef)) return

    emit('submit')
  }

  async function resetFields(): Promise<void> {
    if (!unref(formElRef)) return

    Object.keys(formModel).forEach(key => {
      formModel[key] = schemas.find(item => item.field === key)?.defaultValue
    })

    nextTick(() => clearValidate())

    emit('reset', toRaw(formModel))
  }

  function clearValidate(name?: string | string[]) {
    unref(formElRef)?.clearValidate(name)
  }

  return {
    submitForm,
    resetFields,
    clearValidate
  }
}
