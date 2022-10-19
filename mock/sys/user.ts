import { MockMethod } from 'vite-plugin-mock'
import { requestParams, resultSuccess, resultError, getRequestToken } from '../_util'

export function createFakeUserList() {
  return [
    {
      userId: '10000',
      username: 'admin',
      realName: 'vue admin design',
      avatar: 'https://avatars.githubusercontent.com/u/26238723?v=4',
      desc: 'super admin',
      password: '123456',
      token: 'fakeToken',
      homePath: '/home'
    }
  ]
}

// Mock user login
export default [
  {
    url: '/api/login',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        item => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password!')
      }
      const { userId, username: _username, token, realName, desc } = checkUser
      return resultSuccess({
        userId,
        username: _username,
        token,
        realName,
        desc
      })
    }
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token!')
      const checkUser = createFakeUserList().find(item => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    }
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token!')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed!' })
    }
  }
] as MockMethod[]