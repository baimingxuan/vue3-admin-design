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
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
                '2xl': '1600px'
            }
        }
    }
})
