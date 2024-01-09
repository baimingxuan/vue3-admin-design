import { defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RedirectTo',
  setup() {
    const { currentRoute, replace } = useRouter()

    const { params, query } = unref(currentRoute)
    const { path, redirect_type = 'path' } = params

    Reflect.deleteProperty(params, 'path')
    Reflect.deleteProperty(params, 'redirect_type')

    const pathStr = Array.isArray(path) ? path.join('/') : path

    if (redirect_type === 'name') {
      replace({
        name: pathStr,
        params,
        query
      })
    } else {
      replace({
        path: pathStr.startsWith('/') ? pathStr : '/' + pathStr,
        query
      })
    }

    return () => <div />
  }
})
