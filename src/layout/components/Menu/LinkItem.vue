<script lang="tsx">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LinkItem',
    props: {
      toPath: {
        type: String,
        required: true
      }
    },
    setup(props, { slots }) {
      /**
       * determining external link or route
       * @param path
       */
      function isExternal(path: string): boolean {
        return /^(https?:|mailto:|tel:)/.test(path)
      }

      return () => {
        console.log(slots)
        return (
            <>
              {isExternal(props.toPath) ? (
                  <a href={props.toPath} target='_blank' rel='noopener'>
                    {slots.default!()}
                  </a>
              ) : (
                  <router-link to={props.toPath}>
                    {slots.default!()}
                  </router-link>
              )}
            </>
        )
      }
    }
  })
</script>
