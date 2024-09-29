import type { Ref } from 'vue'
import type { FormProps as AntFormProps } from 'ant-design-vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from './types/form'
import { defineComponent, ref, unref, reactive, computed, watch, onMounted } from 'vue'
import { Row, Card, Form } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
import { basicFormProps } from './props'
import { useFormEvents } from './hooks/useFormEvents'
import { dateUtil } from '@/utils/dateUtil'
import { deepMerge } from '@/utils'
import { DATE_COMPONENTS } from './constant'

export default defineComponent({
  name: 'BasicForm',
  props: basicFormProps,
  emits: ['register', 'fieldValueChange'],
  setup(props, { attrs, slots, emit, expose }) {
    const formElRef = ref<Nullable<FormRefType>>(null)
    const formProps = ref<Partial<FormPropsType>>({})
    const formSchemas = ref<Nullable<FormSchemaType[]>>(null)
    const formModel = reactive<Recordable>({})
    const formDefaultVal = ref<Recordable>({})

    const isSubmitting = ref(false)
    const isAdvanced = ref(false)

    const getFormProps = computed(() => ({ ...props, ...unref(formProps) }) as FormPropsType)

    const getAntFormProps = computed(() => ({ ...attrs, ...props, ...unref(getFormProps) }) as AntFormProps)
    const getFormActionProps = computed(
      () =>
        ({
          ...unref(getFormProps),
          isSubmitting: unref(isSubmitting),
          isAdvanced: unref(isAdvanced)
        }) as InstanceType<typeof FormAction>['$props']
    )

    const getFormSchemas = computed(() => {
      const schemas: FormSchemaType[] = unref(formSchemas) || (unref(getFormProps).schemas as FormSchemaType[])

      for (const schema of schemas) {
        const { component, componentProps = {}, defaultValue, isHandleDateDefaultValue = true } = schema

        if (isHandleDateDefaultValue && component && defaultValue && DATE_COMPONENTS.includes(component)) {
          const opt = {
            schema,
            formModel,
            formRef: {} as FormRefType
          }

          const valueFormat = componentProps
            ? typeof componentProps === 'function'
              ? componentProps(opt)['valueFormat']
              : componentProps['valueFormat']
            : null

          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = valueFormat ? dateUtil(defaultValue).format(valueFormat) : dateUtil(defaultValue)
          } else {
            const def: any[] = []
            defaultValue.forEach(item => {
              def.push(valueFormat ? dateUtil(item).format(valueFormat) : dateUtil(item))
            })
            schema.defaultValue = def
          }
        }
      }

      return cloneDeep(schemas)
    })

    const { submitForm, validateForm, resetFields, validateFields, clearValidate, scrollToField, resetSchemas } =
      useFormEvents({
        emit,
        getFormProps,
        getFormSchemas,
        formModel,
        formDefaultVal,
        formSchemas: formSchemas as Ref<FormSchemaType[]>,
        formElRef: formElRef as Ref<FormRefType>,
        handleFormValues: () => {}
      })

    async function setFormProps(props: Partial<FormPropsType>): Promise<void> {
      formProps.value = deepMerge(unref(formProps) || {}, props)
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      emit('fieldValueChange', key, value)
    }

    function handleToggleAdvanced() {
      console.log('toggleAdvanced')
    }

    watch(
      () => props.schemas,
      (schemas: FormSchemaType[]) => {
        console.log('schemas change', schemas)
        resetSchemas(schemas ?? [])
      }
    )

    const formRef: FormRefType = {
      setFormProps,
      submitForm,
      validateForm,
      resetFields,
      validateFields,
      clearValidate,
      scrollToField,
      resetSchemas
    }

    expose(formRef)

    onMounted(() => {
      emit('register', formRef)
    })

    return () => (
      <Card>
        <Form ref={formElRef} model={formModel} {...unref(getAntFormProps)}>
          <Row {...props.rowProps}>
            {getFormSchemas.value.map(schema => (
              <FormItem
                key={schema.field}
                schema={schema}
                formRef={formRef}
                formProps={unref(getFormProps)}
                formModel={formModel}
                setFormModel={setFormModel}
              />
            ))}
            <FormAction
              {...unref(getFormActionProps)}
              onResetAction={resetFields}
              onSubmitAction={submitForm}
              onToggleAdvanced={handleToggleAdvanced}
            >
              {{
                frontAction: (data: any) => slots.frontAction?.(data),
                middleAction: (data: any) => slots.middleAction?.(data),
                backAction: (data: any) => slots.backAction?.(data)
              }}
            </FormAction>
          </Row>
        </Form>
      </Card>
    )
  }
})
