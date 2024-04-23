import { defineComponent, unref } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import { useTagStore } from '@/stores/modules/tags'
import { useUserStore } from '@/stores/modules/user'
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard'
import { useMessage } from '@/hooks/web/useMessage'
import { appSetting } from '@/settings/appBaseSetting'

export default defineComponent({
  name: 'InputNumItem',
  setup() {
    const { t } = useI18n()
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const tagStore = useTagStore()
    const userStore = useUserStore()
    const { createMessage } = useMessage()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(appStore.getAppConfig), null, 2))

      unref(isSuccessRef) && createMessage.success(`${t('layout.setting.operatingContent')}`)
    }

    function handleReset() {
      try {
        appStore.setAppConfig(appSetting)
        createMessage.success(`${t('layout.setting.resetSuccess')}`)
      } catch (error: any) {
        createMessage.error(error)
      }
    }

    function handleClean() {
      localStorage.clear()
      appStore.resetState()
      permissionStore.resetState()
      tagStore.resetState()
      userStore.resetState()
      location.reload()
    }

    return () => (
      <Space direction='vertical' style={{ width: '100%', marginBottom: '16px' }}>
        <Button type='primary' block onClick={handleCopy}>
          <CopyOutlined />
          <span>{t('layout.setting.copyBtn')}</span>
        </Button>
        <Button block onClick={handleReset}>
          <RedoOutlined />
          <span>{t('layout.setting.resetBtn')}</span>
        </Button>
        <Button danger block onClick={handleClean}>
          <RedoOutlined />
          <span>{t('layout.setting.clearBtn')}</span>
        </Button>
      </Space>
    )
  }
})
