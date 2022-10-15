// Interface data format used to return a unified format

export interface requestParams {
  headers?: { authorization?: string }
  method: string
  body: any
  query: any
}

export function resultSuccess<T = Recordable>(result: T, { message = '成功' } = {}) {
  return {
    type: 'success',
    code: 0,
    result,
    message
  }
}

export function resultError(message = '失败', { code = -1, result = null } = {}) {
  return {
    type: 'error',
    code,
    result,
    message
  }
}

// This function is used to get a token from the request data
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}