import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess } from '../_util'

export default [
  {
    url: '/basic-api/table/getTableList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query
      return resultPageSuccess(page, pageSize, [])
    }
  }
] as MockMethod[]