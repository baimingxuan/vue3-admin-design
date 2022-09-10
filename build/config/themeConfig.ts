import { generate } from '@ant-design/colors'

export const primaryColor = '#1890ff'

type GenerateTheme = 'default' | 'dark'

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme
  })
}

export function getThemeColors(color?: string) {
  const toColor = color || primaryColor
  const defaultColors = generateAntColors(toColor)
  const primary = defaultColors[5]
  const darkColors = generateAntColors(primary, 'dark')

  return [...defaultColors, ...darkColors]
}