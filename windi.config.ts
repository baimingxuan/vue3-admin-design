import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
    darkMode: 'class',
    extract: {
        include: ['**/*.{vue,html,jsx,tsx,ts}'],
        exclude: ['node_modules', '.git', 'dist', '.DS_Store', '.idea', '.vscode', 'yarn.lock', 'windi.config.{ts,js}'],
    },
    theme: {
        extend: {
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1600px',
            }
        }
    }
})
