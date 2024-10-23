import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { BasicForm } from '@/components/Form'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'Crud',
  setup() {
    return () => (
      <div>
        <Card>
          <BasicForm schemas={formSchemas} />
        </Card>
      </div>
    )
  }
})
