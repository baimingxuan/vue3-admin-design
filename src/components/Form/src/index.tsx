import type { FormProps as AntFormProps } from 'ant-design-vue'
import type { FormRefType, FormPropsType } from './types/form'
import { defineComponent, ref, reactive, computed, unref, onMounted } from 'vue'
import { Row, Card, Form } from 'ant-design-vue'
import FormItem from './components/FormItem'
import FormAction from './components/FormAction'
import { basicFormProps } from './props'
import { useFormEvents } from './hooks/useFormEvents'

export default defineComponent({
  name: 'BasicForm',
  props: basicFormProps,
  emits: ['register', 'fieldValueChange'],
  setup(props, { attrs, slots, emit, expose }) {
    const formElRef = ref<Nullable<FormRefType>>(null)
    const formProps = ref<Partial<FormPropsType>>({})
    const formModel = reactive<Recordable>({})

    const getFormProps = computed(() => ({ ...props, ...unref(formProps) }) as FormPropsType)
    const getAntFormProps = computed(() => ({ ...attrs, ...props, ...unref(getFormProps) }) as AntFormProps)

    const { submitForm, resetFields } = useFormEvents({ emit, schemas: props.schemas, formModel, formElRef })
    function setFormModel(key: string, value: any) {
      formModel[key] = value
      emit('fieldValueChange', key, value)
    }

    function handleToggleAdvanced() {
      console.log('toggleAdvanced')
    }

    const formRef = {
      resetFields,
      submitForm
    }

    expose(formRef)

    onMounted(() => {
      emit('register', formRef)
    })

    return () => (
      <Card>
        <Form ref={formElRef} model={formModel} {...unref(getAntFormProps)}>
          <Row {...props.rowProps}>
            {props.schemas.map(schema => (
              <FormItem schema={schema} formProps={props} formModel={formModel} setFormModel={setFormModel} />
            ))}
            <FormAction onResetAction={resetFields} onSubmitAction={submitForm} onToggleAdvanced={handleToggleAdvanced}>
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
