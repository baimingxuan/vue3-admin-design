import { defineComponent, unref } from 'vue'
import { RadioGroup, RadioButton } from 'ant-design-vue'
import type { ThemeEnum } from '@/enums/appEnum'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import styles from './index.module.less'

export default defineComponent({
  name: 'MenuThemeRadio',
  setup() {
    const { getMenuTheme, changeMenuTheme } = useMenuSetting()
    const { isDarkMode } = useDarkModeSetting()

    function handleChangeTheme(e: any) {
      const theme = e.target.value as ThemeEnum
      changeMenuTheme(theme)
    }

    return () => (
      <div class={styles['menu-theme-radio']}>
        <RadioGroup
          value={unref(getMenuTheme)}
          button-style='solid'
          size='small'
          disabled={unref(isDarkMode)}
          onChange={e => handleChangeTheme(e)}
        >
          <RadioButton value='dark'>暗色</RadioButton>
          <RadioButton value='light'>亮色</RadioButton>
        </RadioGroup>
      </div>
    )
  }
})
