import type { LoginParams } from '@/interfaces'
import { service } from '@/utils/axios'

// User login api
export function loginApi(data: LoginParams): Promise<any> {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

// Get User info
export function getUserInfo(): Promise<any> {
  return service({
    url: '/getUserInfo',
    method: 'get'
  })
}

// User logout api
export function logoutApi() {
  return service({
    url: '/logout',
    method: 'get'
  })
}

// Table list
export function getTableList(param) {
  return({
    url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/mock-data/table-list.json',
    method: 'get',
    param
  })
}