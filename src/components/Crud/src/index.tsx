import { defineComponent } from 'vue'
import CrudForm from '@/components/Form'
import { formSchemas } from './_mockData'

export default defineComponent({
  name: 'Crud',
  setup() {
    return () => (
      <div>
        <CrudForm schemas={formSchemas} />
      </div>
    )
  }
})
