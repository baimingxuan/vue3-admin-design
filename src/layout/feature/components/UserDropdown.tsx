import { defineComponent, computed, unref } from 'vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import headerImg from '@/assets/images/avatar.jpeg'

type MenuEvent = 'lock' | 'logout'

export default defineComponent({
  name: 'UserDropdown',

  setup() {
    const userStore = useUserStore()
    const getUserInfo = computed(() => {
      const { realName = '', avatar } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg }
    })

    function handleLock() {}

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
      <Dropdown placement='bottomRight'>
        {{
          default: () => (
            <span class='flex-center' style='cursor: pointer;'>
              <img src={unref(getUserInfo).avatar} style='width: 24px; height: 24px; border-radius: 50%;' />
            </span>
          ),
          overlay: () => (
            <Menu onClick={handleMenuClick}>
              <MenuItem key='lock'>
                <span class='flex-center-v'>
                  <LockOutlined />
                  <span style='margin-left: 4px;'>锁定屏幕</span>
                </span>
              </MenuItem>
              <MenuItem key='logout'>
                <span class='flex-center-v'>
                  <PoweroffOutlined />
                  <span style='margin-left: 4px;'>退出登录</span>
                </span>
              </MenuItem>
            </Menu>
          )
        }}
      </Dropdown>
    )
  }
})
