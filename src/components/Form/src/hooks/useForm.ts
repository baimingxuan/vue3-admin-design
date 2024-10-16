import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { DynamicProps } from '../types'
import type { FormRefType, FormReturnType, FormSchemaInnerType as FormSchemaType, FormPropsType } from '../types/form'
import { ref, unref, watch, nextTick, onUnmounted } from 'vue'
import { getDynamicProps } from '@/utils'
import { isProdMode } from '@/utils/env'

type FormProps = Partial<DynamicProps<FormPropsType>>
export function useForm(props?: FormProps): FormReturnType {
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

    watch(
      () => props,
      () => {
        props && formInstance.setFormProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const formActions: FormRefType = {
    async setFormProps(props: Partial<FormPropsType>) {
      const form = await getForm()
      form.setFormProps(props)
    },
    async submitForm(): Promise<any> {
      const form = await getForm()
      return await form.submitForm()
    },
    async validateForm<T = Recordable>(nameList?: NamePath[] | false | undefined): Promise<T> {
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
    },
    async updateSchemas(data: Partial<FormSchemaType> | Partial<FormSchemaType>[]) {
      const form = await getForm()
      form.updateSchemas(data)
    },
    async resetSchemas(schema: Partial<FormSchemaType> | Partial<FormSchemaType>[]) {
      const form = await getForm()
      form.resetSchemas(schema)
    },
    async setFieldsValues(values: Recordable<any>) {
      const form = await getForm()
      form.setFieldsValues(values)
    },
    getFieldsValues() {
      return unref(formRef)?.getFieldsValues() as Recordable<any>
    },
    async appendSchemaByField(
      schema: FormSchemaType | FormSchemaType[],
      prefixField: string | undefined,
      first?: boolean
    ) {
      const form = await getForm()
      form.appendSchemaByField(schema, prefixField, first)
    },
    async removeSchemaByField(field: string | string[]) {
      unref(formRef)?.removeSchemaByField(field)
    }
  }

  return [register, formActions]
}
