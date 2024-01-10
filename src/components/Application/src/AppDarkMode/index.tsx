import { defineComponent, computed, unref } from 'vue'
import { AppModeEnum } from '@/enums/appEnum'
import { useBaseSetting } from '@/hooks/setting/useBaseSetting'
import { updateDarkTheme } from '@/logics/theme/mode'
import SvgIcon from '@/components/SvgIcon'
import compoStyle from './index.module.less'

export default defineComponent({
  name: 'AppDarkMode',
  setup() {
    const prefixCls = 'compo_app-dark-mode'
    const { setAppMode, getAppMode, getThemeColor } = useBaseSetting()

    const isDarkMode = computed(() => getAppMode.value === AppModeEnum.DARK)

    function switchAppMode() {
      const mode = getAppMode.value === AppModeEnum.DARK ? AppModeEnum.LIGHT : AppModeEnum.DARK
      setAppMode(mode)
      updateDarkTheme(mode)
    }

    return () => (
      <div
        class={[compoStyle[prefixCls], { [compoStyle[`${prefixCls}--dark`]]: unref(isDarkMode) }]}
        style={{ background: unref(isDarkMode) ? unref(getThemeColor) : 'rgba(0, 0, 0, 0.45)' }}
        onClick={switchAppMode}
      >
        <div class={compoStyle['mode__inner']} />
        <SvgIcon size={14} name='sun' />
        <SvgIcon size={14} name='moon' />
      </div>
    )
  }
})
