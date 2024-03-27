import type { ThemeEnum } from '@/enums/appEnum'
import { defineComponent, unref } from 'vue'
import { RadioGroup, RadioButton } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useDarkModeSetting } from '@/hooks/setting/useDarkModeSetting'
import styles from './index.module.less'

export default defineComponent({
  name: 'MenuThemeRadio',
  setup() {
    const { t } = useI18n()
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
          <RadioButton value='dark'>{t('layout.setting.darkMode')}</RadioButton>
          <RadioButton value='light'>{t('layout.setting.lightMode')}</RadioButton>
        </RadioGroup>
      </div>
    )
  }
})
