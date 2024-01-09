import { defineComponent } from 'vue'
import { Form, FormItem, Select, Checkbox } from 'ant-design-vue'

export default defineComponent({
  name: 'CodeToolbar',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class='flex-between-h' style='padding: 8px; border: solid 1px #ddd;'>
        <Form model={props.config} layout='inline'>
          <FormItem label='language'>
            <Select
              v-model:value={props.config.language}
              size='small'
              options={[
                { label: 'html', value: 'html' },
                { label: 'javascript', value: 'javascript' },
                { label: 'typescript', value: 'typescript' }
              ]}
              style='width: 110px'
            />
          </FormItem>
          <FormItem label='autofocus'>
            <Checkbox v-model:checked={props.config.autofocus} />
          </FormItem>
          <FormItem label='indentWithTab'>
            <Checkbox v-model:checked={props.config.indentWithTab} />
          </FormItem>
          <FormItem label='tabSize'>
            <Select
              v-model:value={props.config.tabSize}
              size='small'
              options={[
                { label: 2, value: 2 },
                { label: 4, value: 4 },
                { label: 6, value: 6 },
                { label: 8, value: 8 }
              ]}
              style='width: 100px'
            />
          </FormItem>
          <FormItem label='height'>
            <Select
              v-model:value={props.config.height}
              size='small'
              options={[
                { label: 'auto', value: 'auto' },
                { label: '350px', value: '350px' },
                { label: '500px', value: '500px' }
              ]}
              style='width: 100px'
            />
          </FormItem>
        </Form>
      </div>
    )
  }
})
