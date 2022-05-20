import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { isString } from '@/utils/is'

// go page
export function useGo(_router?: Router) {
    let router
    if (!_router) {
        router = useRouter()
    }
    function go(opt: string, isReplace = false) {
        if (!opt) return
    }
    return go
}