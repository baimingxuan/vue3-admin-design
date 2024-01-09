import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windiCSS from 'vite-plugin-windicss'
import { configMockPlugin } from './mock'
import { configSvgIconsPlugin } from './svgIcons'
import { configStyleImportPlugin } from './styles'
import { configThemePlugin } from './theme'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // required plugin
    vue(),
    vueJsx()
  ]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin())

  return vitePlugins
}
