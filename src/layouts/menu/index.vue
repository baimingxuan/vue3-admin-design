<script lang="tsx">
  import { defineComponent } from 'vue'
  import { propTypes } from '@/utils/propTypes'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      menuTheme: propTypes.oneOf(['light', 'dark']),
      
      menuMode: {
        type: String,
        default: ''
      }
    }
  })
</script>