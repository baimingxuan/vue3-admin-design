import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import CrudForm from '@/components/Form'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'Crud',
  setup() {
    return () => (
      <div>
        <Card>
          <CrudForm schemas={formSchemas} />
        </Card>
      </div>
    )
  }
})
