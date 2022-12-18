import { defineComponent } from 'vue'
import { Form, FormItem } from 'ant-design-vue'

export default defineComponent({
  name: 'CodeInfo',
  setup() {

    return () => (
      <div style='padding: 4px 8px; border: solid 1px #ddd;'>
        <Form layout='inline'>
          <FormItem label='Spaces'>
            <span>2</span>
          </FormItem>
          <FormItem label='Length'>
            <span>322</span>
          </FormItem>
          <FormItem label='Lines'>
            <span>56</span>
          </FormItem>
          <FormItem label='Cursor'>
            <span>1120</span>
          </FormItem>
          <FormItem label='Selected'>
            <span>0</span>
          </FormItem>
        </Form>
      </div>
    )
  }
})