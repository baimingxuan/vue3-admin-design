import { defineComponent, reactive, ref, unref, computed } from 'vue'
import { Form, InputPassword, Button, Flex, Avatar, message } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'
import { useLockStore } from '@/stores/modules/lock'
import { useI18n } from 'vue-i18n'
import defaultAvatar from '@/assets/images/avatar.jpeg'
import styles from './index.module.less'

export default defineComponent({
  name: 'UnlockForm',
  setup(_, { emit }) {
    const { t } = useI18n()
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
          message.error(`${t('layout.lock.pwdError')}`)
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
            <Form.Item name='password' rules={[{ required: true, message: `${t('layout.lock.pwdPlaceholder')}` }]}>
              <InputPassword v-model:value={unlockForm.password} placeholder={t('layout.lock.pwdPlaceholder')} />
            </Form.Item>
            <div>
              <Flex justify='space-between'>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} onClick={() => emit('cancel')}>
                  {t('layout.lock.cancelBtn')}
                </Button>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} onClick={goLogin}>
                  {t('layout.lock.loginBtn')}
                </Button>
                <Button type='link' disabled={unref(loading)} class={styles['link-btn']} htmlType='submit'>
                  {t('layout.lock.confirmBtn')}
                </Button>
              </Flex>
            </div>
          </Form>
        </div>
      </div>
    )
  }
})
