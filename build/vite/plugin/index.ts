import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { configMockPlugin } from './mock'
import { configSvgIconsPlugin } from './svgIcons'
import { configStyleImportPlugin } from './styles'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // required plugin
    vue(),
    vueJsx()
  ]

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  vitePlugins.push(configMockPlugin(isBuild))

  // code-inspector-plugin
  vitePlugins.push(
    codeInspectorPlugin({
      bundler: 'vite'
    })
  )

  return vitePlugins
}
