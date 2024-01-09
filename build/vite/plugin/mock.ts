/**
 * Mock plugin for development and production.
 * https://github.com/vbenjs/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    mockPath: 'mock',
    ignore: /^\_/,
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer'

      setupProdMockServer()
      `
  })
}
