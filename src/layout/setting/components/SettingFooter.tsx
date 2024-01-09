import { defineComponent, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue'

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
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const tagStore = useTagStore()
    const userStore = useUserStore()
    const { createMessage } = useMessage()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(appStore.getAppConfig), null, 2))

      unref(isSuccessRef) && createMessage.success('复制成功,请到 src/settings/appBaseSetting.ts 中修改配置！')
    }

    function handleReset() {
      try {
        appStore.setAppConfig(appSetting)
        createMessage.success('重置成功！')
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
      <div class='flex-center-v' style='flex-direction: column;'>
        <Button type='primary' block onClick={handleCopy}>
          <CopyOutlined />
          <span>拷贝</span>
        </Button>
        <Button block class='my-3' onClick={handleReset}>
          <RedoOutlined />
          <span>重置</span>
        </Button>
        <Button block onClick={handleClean}>
          <span>清空缓存并返回登录页</span>
        </Button>
      </div>
    )
  }
})
