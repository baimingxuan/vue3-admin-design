<script lang="tsx">
  import { defineComponent } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { Menu } from './src/index'
  import { useGo } from '@/hooks/web/usePage'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      menuTheme: propTypes.oneOf(['light', 'dark']),
      menuMode: {
        type: String,
        default: ''
      },
      isHorizontal: propTypes.bool
    },
    components: { Menu },

    setup(props) {
      const go = useGo()

      function handleMenuClick(path: string) {
        go(path)
      }

      return () => (
        <></>
      )
    }
  })
</script>