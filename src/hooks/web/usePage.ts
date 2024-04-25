import type { Router, RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { unref } from 'vue'

import { isString } from '@/utils/is'

// handle error
function handleError(e: Error) {
  console.log(e)
}

// go page
export function useGo(router?: Router) {
  const { push, replace } = router || useRouter()

  function go(opt: RouteLocationRaw, isReplace = false) {
    if (!opt) return
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    } else {
      const _opt = opt as RouteLocationRaw
      isReplace ? replace(_opt).catch(handleError) : push(_opt).catch(handleError)
    }
  }

  return go
}

// reload current page
export function useReload(router?: Router) {
  const { replace, currentRoute } = router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)

  function reload(): Promise<boolean> {
    return new Promise(resolve => {
      if (name === 'Redirect') {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params['_origin_params'] = JSON.stringify(params ?? {})
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      replace({ name: 'Redirect', params, query }).then(() => resolve(true))
    })
  }

  return reload
}
