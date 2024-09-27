import type { FormProps as AntFormProps } from 'ant-design-vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType } from './types/form'
import { defineComponent, ref, reactive, computed, unref, onMounted } from 'vue'
import { Row, Card, Form } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
import { basicFormProps } from './props'
import { useFormEvents } from './hooks/useFormEvents'
import { dateUtil } from '@/utils/dateUtil'
import { deepMerge } from '@/utils'
import { DATE_COMPONENT_TYPE } from './constant'

export default defineComponent({
  name: 'BasicForm',
  props: basicFormProps,
  emits: ['register', 'fieldValueChange'],
  setup(props, { attrs, slots, emit, expose }) {
    const formElRef = ref<Nullable<FormRefType>>(null)
    const formProps = ref<Partial<FormPropsType>>({})
    const formSchemas = ref<Nullable<FormSchemaType[]>>(null)
    const formModel = reactive<Recordable>({})

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

        if (isHandleDateDefaultValue && component && defaultValue && DATE_COMPONENT_TYPE.includes(component)) {
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

    const { submitForm, resetFields } = useFormEvents({ emit, schemas: props.schemas, formModel, formElRef })

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

    const formRef = {
      resetFields,
      submitForm,
      setFormProps
    } as FormRefType

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
