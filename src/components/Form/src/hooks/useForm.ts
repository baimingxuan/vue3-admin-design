import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { FormRefType, FormReturnType } from '../types/form'
import { ref, unref, nextTick, onUnmounted } from 'vue'
import { isProdMode } from '@/utils/env'

export function useForm(): FormReturnType {
  const formRef = ref<Nullable<FormRefType>>(null)
  const isLoaded = ref<Nullable<boolean>>(null)

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
        isLoaded.value = null
      })

      if (unref(isLoaded) && formInstance === unref(formRef)) return
    }

    formRef.value = formInstance
    isLoaded.value = true
  }

  const formActions: FormRefType = {
    async submitForm(): Promise<any> {
      const form = await getForm()
      return await form.submitForm()
    },
    async validateForm<T = Recordable>(nameList?: NamePath[] | false): Promise<T> {
      const form = await getForm()
      return await form.validateForm(nameList)
    },
    async resetFields(): Promise<void> {
      const form = await getForm()
      await form.resetFields()
    },
    async validateFields(nameList?: NamePath[]): Promise<Recordable> {
      const form = await getForm()
      return await form.validateFields(nameList)
    },
    async clearValidate(name?: string | string[]): Promise<void> {
      const form = await getForm()
      await form.clearValidate(name)
    },
    async scrollToField(name: NamePath, options?: ScrollOptions): Promise<void> {
      const form = await getForm()
      await form.scrollToField(name, options)
    }
  }

  return [register, formActions]
}
