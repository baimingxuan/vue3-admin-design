import type { Router, RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'

import { isString } from '@/utils/is'

// handle error
function handleError(e: Error) {
    console.log(e)
}

// go page
export function useGo(_router?: Router) {
    const { push, replace } = _router || useRouter()
    function go(opt: RouteLocationRaw, isReplace = false) {
        if (!opt) return
        if (isString(opt)) {
            isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
        } else {
            const _opt = opt as RouteLocationRaw;
            isReplace ? replace(_opt).catch(handleError) : push(_opt).catch(handleError)
        }
    }
    return go
}