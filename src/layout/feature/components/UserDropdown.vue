<template>
  <AntdDropdown placement="bottomRight">
    <span class="flex-center" style="cursor: pointer;">
      <img
        :src="getUserInfo.avatar"
        style="width: 24px; height: 24px; border-radius: 50%;"
      />
    </span>
    <template #overlay>
      <AntdMenu @click="handleMenuClick">
        <AntdMenuItem key="lock">
          <span class="flex-center-v">
            <LockOutlined />
            <span style="margin-left: 4px;">锁定屏幕</span>
          </span>
        </AntdMenuItem>
        <AntdMenuItem key="logout">
          <span class="flex-center-v">
            <PoweroffOutlined />
            <span style="margin-left: 4px;">退出登录</span>
          </span>
        </AntdMenuItem>
      </AntdMenu>
    </template>
  </AntdDropdown>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import {
    Dropdown as AntdDropdown,
    Menu as AntdMenu,
    MenuItem as AntdMenuItem
  } from 'ant-design-vue'
  import { LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue'
  import { useUserStore } from '@/stores/modules/user'
  import headerImg from '@/assets/images/avatar.png'

  type MenuEvent = 'lock' | 'logout'

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
</script>

