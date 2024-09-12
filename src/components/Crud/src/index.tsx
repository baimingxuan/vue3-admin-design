import { defineComponent } from 'vue'
import CrudForm from './components/Form'

export default defineComponent({
  name: 'Crud',
  setup(props) {
    return () => (
      <div>
        <CrudForm />
      </div>
    )
  }
})
