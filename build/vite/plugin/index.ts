import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import windiCSS from 'vite-plugin-windicss'
import { configSvgIconsPlugin } from './svgIcons'

export function createVitePlugins(isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [
        // required plugin
        vue(),
        vueJsx(),
    ]

    // vite-plugin-windicss
    vitePlugins.push(windiCSS())

    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild))

    return vitePlugins
}
