import { defineComponent, reactive, ref, unref, computed } from 'vue'
import { Form, InputPassword, Button, Avatar, Modal } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'
import { useLockStore } from '@/stores/modules/lock'
import { useI18n } from 'vue-i18n'
import defaultAvatar from '@/assets/images/avatar.jpeg'
import styles from './index.module.less'

export default defineComponent({
  name: 'LockModal',
  setup(_, { expose }) {
    const { t } = useI18n()
    const openModal = ref<boolean>(false)
    const userStore = useUserStore()
    const lockStore = useLockStore()

    const lockFormRef = ref()
    const lockForm = reactive({
      password: ''
    })

    const userInfo = computed(() => userStore.getUserInfo || {})

    function handleOpen() {
      openModal.value = true
    }

    function handleLock() {
      lockStore.setLockInfo({
        isLock: true,
        pwd: lockForm.password
      })

      handleCancel()
    }

    function handleCancel() {
      lockFormRef.value.resetFields()
      openModal.value = false
    }

    expose({
      handleOpen
    })

    return () => (
      <Modal
        open={unref(openModal)}
        title={t('layout.lock.lockScreen')}
        width='400px'
        footer={null}
        onCancel={handleCancel}
      >
        <div class={styles['lock-modal-content']}>
          <div class={[styles['user-info'], 'flex-center-v']}>
            <Avatar src={unref(userInfo).avatar || defaultAvatar} size={72} />
            <p class={styles['name']}>{unref(userInfo).realName || 'Admin Design'}</p>
          </div>
          <Form ref={lockFormRef} model={lockForm} autocomplete={false} onFinish={handleLock}>
            <Form.Item name='password' rules={[{ required: true, message: `${t('layout.lock.unlockPlaceholder')}` }]}>
              <InputPassword v-model:value={lockForm.password} placeholder={t('layout.lock.unlockPlaceholder')} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                {t('layout.lock.lockScreen')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
})
