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
    setup(props) {
      /**
       * determining external link or route
       * @param path
       */
      function isExternal(path: string): boolean {
        return /^(https?:|mailto:|tel:)/.test(path)
      }

      return () => {
        return (
            <>
              {isExternal(props.toPath) ? (
                <a href={props.toPath} target='_blank' rel='noopener' />
              ) : (
                <router-link to={props.toPath} />
              )}
            </>
        )
      }
    }
  })
</script>
