import { defineComponent, unref, computed } from 'vue'
import { Space } from 'ant-design-vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { MenuTypeEnum } from '@/enums/menuEnum'
import { ThemeEnum } from '@/enums/appEnum'
import { useGo } from '@/hooks/web/usePage'
import styles from './index.module.less'
import logoImg from '@/assets/images/logo.png'
import logoName from '@/assets/images/name.png'
import logoNameWhite from '@/assets/images/name_white.png'

export default defineComponent({
  name: 'AppLogo',
  setup() {
    const { getMenuFold, getMenuType, getMenuTheme, getMenuFoldShowTitle } = useMenuSetting()
    const go = useGo()

    function goHome() {
      go('/')
    }

    const logoNameImg = computed(() => {
      return unref(getMenuTheme) === ThemeEnum.DARK ? logoNameWhite : logoName
    })

    const getLogoFold = computed(() => {
      return unref(getMenuFold) && !unref(getMenuFoldShowTitle)
    })

    return () => (
      <div class={['anticon', styles['app-logo'], { [styles['collapsed']]: unref(getLogoFold) }]} onClick={goHome}>
        <Space>
          <img class={styles['logo-img']} src={logoImg} alt='logo' />
          <img
            class={[
              styles['logo-name'],
              { [styles['hidden']]: unref(getMenuFold) || unref(getMenuType) === MenuTypeEnum.HYBRID_MENU }
            ]}
            src={unref(logoNameImg)}
            alt='logo'
          />
        </Space>
      </div>
    )
  }
})
