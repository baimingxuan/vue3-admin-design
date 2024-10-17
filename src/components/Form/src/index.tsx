import type { Ref } from 'vue'
import type { FormProps as AntFormProps } from 'ant-design-vue'
import type { FormRefType, FormPropsType, FormSchemaInnerType as FormSchemaType, AdvanceType } from './types/form'
import { defineComponent, ref, unref, reactive, computed, watch, onMounted } from 'vue'
import { Row, Form } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
import { basicFormProps } from './props'
import { useAdvanced } from './hooks/useAdvanced'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { dateUtil } from '@/utils/dateUtil'
import { deepMerge } from '@/utils'
import { isFunction, isArray } from '@/utils/is'
import { DATE_COMPONENTS } from './constant'
import './index.less'

export default defineComponent({
  name: 'BasicForm',
  props: basicFormProps,
  emits: ['register', 'fieldValueChange', 'reset', 'submit'],
  setup(props, { attrs, slots, emit, expose }) {
    const formElRef = ref<Nullable<FormRefType>>(null)
    const formProps = ref<Partial<FormPropsType>>({})
    const formSchemas = ref<Nullable<FormSchemaType[]>>(null)
    const formModel = reactive<Recordable>({})
    const formDefaultVal = ref<Recordable>({})

    const isInitedDefault = ref(false)
    const isSubmitting = ref(false)

    const advanceState = reactive<AdvanceType>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoaded: false,
      actionSpan: 4
    })

    const getFormProps = computed(() => ({ ...props, ...unref(formProps) }) as FormPropsType)

    const getAntFormProps = computed(() => ({ ...attrs, ...props, ...unref(getFormProps) }) as AntFormProps)
    const getFormActionProps = computed(
      () =>
        ({
          ...unref(getFormProps),
          isSubmitting: unref(isSubmitting),
          ...advanceState
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
            ? isFunction(componentProps)
              ? componentProps(opt)['valueFormat']
              : componentProps['valueFormat']
            : null

          if (!isArray(defaultValue)) {
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

    const { initDefaultValue, handleFormValues } = useFormValues({
      getFormProps,
      getFormSchemas,
      formModel,
      formDefaultVal
    })

    const {
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
    } = useFormEvents({
      emit,
      getFormProps,
      getFormSchemas,
      formModel,
      formDefaultVal,
      formSchemas: formSchemas as Ref<FormSchemaType[]>,
      formElRef: formElRef as Ref<FormRefType>,
      handleFormValues
    })

    const { handleToggleAdvanced, fieldsIsAdvancedMap } = useAdvanced({
      advanceState,
      getFormProps,
      getFormSchemas,
      formModel,
      formDefaultVal
    })

    async function setFormProps(props: Partial<FormPropsType>): Promise<void> {
      formProps.value = deepMerge(unref(formProps) || {}, props)
    }

    function setFormModel(key: string, value: any, schema: FormSchemaType) {
      formModel[key] = value
      emit('fieldValueChange', key, value)

      // This function will only be triggered again if autoLink=false requires a manual link
      if (schema && schema.itemProps && !schema.itemProps.autoLink) {
        validateFields([key]).catch(_ => {})
      }
    }

    watch(
      () => props.schemas,
      (schemas: FormSchemaType[]) => {
        resetSchemas(schemas ?? [])
      }
    )

    watch(
      () => unref(getFormProps).model,
      () => {
        const { model } = unref(getFormProps)
        if (!model) return
        setFieldsValues(model)
      },
      {
        immediate: true
      }
    )

    watch(
      () => unref(getFormSchemas),
      schemas => {
        if (unref(isInitedDefault)) return

        if (schemas?.length) {
          initDefaultValue()
          isInitedDefault.value = true
        }
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
      updateSchemas,
      resetSchemas,
      setFieldsValues,
      getFieldsValues,
      appendSchemaByField,
      removeSchemaByField
    }

    onMounted(() => {
      initDefaultValue()
      emit('register', formRef)
    })

    expose(formRef)

    return () => (
      <Form {...unref(getAntFormProps)} class='basic-form-wrapper' ref={formElRef} model={formModel}>
        <Row {...props.rowProps}>
          {getFormSchemas.value.map(schema => (
            <FormItem
              key={schema.field}
              schema={schema}
              formRef={formRef}
              formProps={unref(getFormProps)}
              formDefaultVal={unref(formDefaultVal)}
              formModel={formModel}
              setFormModel={setFormModel}
              isAdvanced={fieldsIsAdvancedMap[schema.field]}
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
    )
  }
})
