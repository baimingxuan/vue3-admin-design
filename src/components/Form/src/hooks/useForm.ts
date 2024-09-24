import type { FormRefType, FormReturnType, FormPropType } from '../types'
import { ref, unref, nextTick, onUnmounted } from 'vue'
import { isProdMode } from '@/utils/env'

export function useForm(props: Partial<FormPropType>): FormReturnType {
  const formRef = ref<Nullable<FormRefType>>(null)
  const isLoaded = ref<boolean>(false)

  async function getForm() {
    const form = unref(formRef)

    if (!form) {
      throw new Error('The form instance has not been implemented yet!')
    }

    await nextTick()

    return form as FormRefType
  }

  function register(formInstance: FormRefType) {
    if (isProdMode()) {
      onUnmounted(() => {
        formRef.value = null
        isLoaded.value = false
      })

      if (unref(isLoaded) && formInstance === unref(formRef)) return
    }

    formRef.value = formInstance
    isLoaded.value = true
  }

  const formActions = {} as FormRefType

  return [register, formActions]
}
