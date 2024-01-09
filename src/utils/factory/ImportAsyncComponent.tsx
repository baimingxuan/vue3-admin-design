import { defineAsyncComponent } from 'vue'
import { Spin } from 'ant-design-vue'

interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

interface Options {
  size?: 'default' | 'small' | 'large'
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}

export function ImportAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 5000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin spinning={true} size={size} /> : undefined,
    timeout,
    delay,
    onError: !retry
      ? () => {}
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry()
          } else {
            fail()
          }
        }
  })
}
