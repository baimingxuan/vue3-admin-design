<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MenuItemContent',
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      return () => {
        return (
            <>
              {props.icon ? (<i class={'icon ' + props.icon} />) : ''}
              {props.title ? (<span>{props.title}</span>) : ''}
            </>
        )
      }
    }
  })
</script>
