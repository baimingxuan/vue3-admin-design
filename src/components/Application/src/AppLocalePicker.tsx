import { defineComponent, ref, unref, watchEffect } from 'vue'
import { Dropdown, Menu, MenuItem, Tooltip } from 'ant-design-vue'
import { localeList } from '@/settings/localeSetting'
import { useLocaleSetting } from '@/hooks/setting/useLocaleSetting'
import SvgIcon from '@/components/SvgIcon'

export default defineComponent({
  name: 'AppLocalePicker',

  setup() {
    const selectedKeys = ref<string[]>([localeList[0].event])
    const { getLocale, changeLocale } = useLocaleSetting()

    watchEffect(() => {
      selectedKeys.value = [unref(getLocale)]
    })

    async function handlePicker(lang) {
      await changeLocale(lang)
      selectedKeys.value = [lang as string]
      location.reload()
    }

    return () => (
      <span>
        <Dropdown trigger='click' placement='bottom'>
          {{
            default: () => (
              <Tooltip title='多语言' placement='bottom' mouseEnterDelay={0.5}>
                <span class='icon-btn'>
                  <SvgIcon name='locale' size={20} />
                </span>
              </Tooltip>
            ),
            overlay: () => (
              <Menu selectedKeys={unref(selectedKeys)}>
                {localeList.map(locale => (
                  <MenuItem key={locale.event} onClick={() => handlePicker(locale.event)}>
                    {locale.text}
                  </MenuItem>
                ))}
              </Menu>
            )
          }}
        </Dropdown>
      </span>
    )
  }
})
