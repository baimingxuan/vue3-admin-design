/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */

import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    resolves: [AndDesignVueResolve()],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: name => {
          const replaceList = {
            'layout-header': 'layout',
            'layout-sider': 'layout',
            'layout-content': 'layout',
            'layout-footer': 'layout',
            'sub-menu': 'menu',
            'menu-item': 'menu',
            'form-item': 'form',
            'input-password': 'input',
            textarea: 'input',
            'radio-group': 'radio',
            'radio-button': 'radio',
            'checkbox-group': 'checkbox',
            'upload-dragger': 'upload'
          }
          return replaceList.hasOwnProperty(name)
            ? `ant-design-vue/es/${replaceList[name]}/style/index`
            : `ant-design-vue/es/${name}/style/index`
        }
      }
    ]
  })
}
