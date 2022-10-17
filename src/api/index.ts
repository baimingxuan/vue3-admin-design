import type { LoginParams } from '@/interfaces'
import { service } from '@/utils/axios'

// User login api
export function loginApi(data: LoginParams): Promise<any> {
  return service({
    url: '/login',
    method: 'POST',
    data
  })
}

// Get User info
export function getUserInfo(): Promise<any> {
  return service({
    url: '/getUserInfo',
    method: 'GET'
  })
}