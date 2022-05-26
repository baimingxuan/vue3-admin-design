import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGuard(router: Router) {
    createPermissionGuard(router)
}
