export function is(val: unknown, type: string) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val);
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}
