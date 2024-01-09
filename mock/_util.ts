// Interface data format used to return a unified format

export interface requestParams {
  headers?: { authorization?: string }
  method: string
  body: any
  query: any
}

export function resultSuccess<T = Recordable>(data: T, { message = '成功' } = {}) {
  return {
    type: 'success',
    code: 0,
    data,
    message
  }
}

export function resultError(message = '失败', { code = -1, data = null } = {}) {
  return {
    type: 'error',
    code,
    data,
    message
  }
}

// This function is used to get a token from the request data
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}

export function pagination<T = any>(currentPage: number, pageSize: number, array: T[]): T[] {
  const offset = (currentPage - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

export function resultPageSuccess<T = any>(currentPage: number, pageSize: number, list: T[], { message = 'ok' } = {}) {
  const pageData = pagination(currentPage, pageSize, list)

  return {
    ...resultSuccess({
      list: pageData,
      total: list.length
    }),
    message
  }
}
