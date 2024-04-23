import { defineComponent, computed, ref, unref } from 'vue'
import { Dropdown, Menu, MenuItem, Avatar } from 'ant-design-vue'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/modules/user'
import LockModal from '@/layout/lock/components/LockModal'
import defaultAvatar from '@/assets/images/avatar.jpeg'

type MenuEvent = 'lock' | 'logout'

export default defineComponent({
  name: 'UserDropdown',

  setup() {
    const { t } = useI18n()
    const lockModalRef = ref()
    const userStore = useUserStore()

    const getUserInfo = computed(() => {
      const { realName = '', avatar } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || defaultAvatar }
    })

    function handleLock() {
      lockModalRef.value?.handleOpen()
    }

    function handleLogout() {
      userStore.confirmLogout()
    }

    function handleMenuClick(e) {
      const key = e.key as MenuEvent
      switch (key) {
        case 'lock':
          handleLock()
          break
        case 'logout':
          handleLogout()
          break
      }
    }

    return () => (
      <>
        <Dropdown placement='bottomRight'>
          {{
            default: () => (
              <span class='flex-center' style='cursor: pointer;'>
                <Avatar src={unref(getUserInfo).avatar} size={24} />
              </span>
            ),
            overlay: () => (
              <Menu onClick={handleMenuClick}>
                <MenuItem key='lock'>
                  <span class='flex-center-v'>
                    <LockOutlined />
                    <span style='margin-left: 4px;'>{t('layout.feature.lockScreen')}</span>
                  </span>
                </MenuItem>
                <MenuItem key='logout'>
                  <span class='flex-center-v'>
                    <PoweroffOutlined />
                    <span style='margin-left: 4px;'>{t('layout.feature.logout')}</span>
                  </span>
                </MenuItem>
              </Menu>
            )
          }}
        </Dropdown>
        <LockModal ref={lockModalRef} />
      </>
    )
  }
})
