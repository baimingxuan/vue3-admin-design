import { defineComponent } from 'vue'
import CrudForm from './components/Form'

export default defineComponent({
  name: 'Crud',
  setup() {
    return () => (
      <div>
        <CrudForm />
      </div>
    )
  }
})
