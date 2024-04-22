import { defineComponent, reactive, ref, unref, computed } from 'vue'
import { Form, InputPassword, Button, Flex, Avatar, message } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'
import { useLockStore } from '@/stores/modules/lock'
import defaultAvatar from '@/assets/images/avatar.jpeg'
import styles from './index.module.less'

export default defineComponent({
  name: 'UnlockForm',
  setup(_, { emit }) {
    const userStore = useUserStore()
    const lockStore = useLockStore()

    const unlockForm = reactive({
      password: ''
    })
    const loading = ref(false)

    const userInfo = computed(() => userStore.getUserInfo || {})

    function goLogin() {
      userStore.logout(true)
      lockStore.resetLockInfo()
    }

    async function handleUnLock() {
      try {
        loading.value = true
        const res = await lockStore.unlockPage(unlockForm.password)
        if (!res) {
          message.error('锁屏密码或用户密码错误！')
        }
      } finally {
        loading.value = false
      }
    }

    return () => (
      <div class={[styles['unlock-form-wrapper'], 'flex-center']}>
        <div class={styles['unlock-content']}>
          <div class={[styles['user-info'], 'flex-center-v']}>
            <Avatar src={unref(userInfo).avatar || defaultAvatar} size={72} />
            <p class={styles['name']}>{unref(userInfo).realName || 'Admin Design'}</p>
          </div>
          <Form model={unlockForm} autocomplete={false} onFinish={handleUnLock}>
            <Form.Item name='password' rules={[{ required: true, message: '请输入锁屏密码或用户密码' }]}>
              <InputPassword v-model:value={unlockForm.password} placeholder='请输入锁屏密码或用户密码' />
            </Form.Item>
            <div>
              <Flex justify='space-between'>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} onClick={() => emit('cancel')}>
                  取消解锁
                </Button>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} onClick={goLogin}>
                  前往登录
                </Button>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} htmlType='submit'>
                  进入系统
                </Button>
              </Flex>
            </div>
          </Form>
        </div>
      </div>
    )
  }
})
