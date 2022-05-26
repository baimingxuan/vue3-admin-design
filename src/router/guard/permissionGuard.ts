import type { Router, RouteRecordRaw } from 'vue-router'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'

export function createPermissionGuard(router: Router) {
    const permissionStore = usePermissionStoreWithOut()
    router.beforeEach(async (to, from, next) => {
        const routes = await permissionStore.buildRoutesAction()
        next()
    })
}