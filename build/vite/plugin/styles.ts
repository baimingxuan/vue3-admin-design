/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */

import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    resolves: [
      AndDesignVueResolve()
    ],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        }
      }
    ]
  })
}