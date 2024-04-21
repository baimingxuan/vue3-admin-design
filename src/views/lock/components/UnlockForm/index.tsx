import { defineComponent, reactive, unref, computed } from 'vue'
import { Form, InputPassword, Button, Flex, Avatar } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'
import defaultAvatar from '@/assets/images/avatar.jpeg'
import styles from './index.module.less'

export default defineComponent({
  name: 'UnlockForm',
  setup() {
    const userStore = useUserStore()
    const unlockForm = reactive({
      password: ''
    })

    const userInfo = computed(() => userStore.getUserInfo || {})

    return () => (
      <div class={styles['unlock-form-wrapper']}>
        <div class={styles['unlock-content']}>
          <div class={styles['user-info']}>
            <Avatar src={unref(userInfo).avatar || defaultAvatar} size={72} />
            <p class={styles['name']}>{unref(userInfo).realName || 'Admin Design'}</p>
          </div>
          <Form model={unlockForm} autocomplete={false}>
            <Form.Item name='password' rules={[{ required: true, message: '请输入锁屏密码或用户密码' }]}>
              <InputPassword v-model:value={unlockForm.password} placeholder='请输入锁屏密码或用户密码' />
            </Form.Item>
            <Form.Item>
              <Flex justify='space-between'>
                <Button type='link' style='color: #fff'>
                  取消解锁
                </Button>
                <Button type='link' style='color: #fff'>
                  前往登录
                </Button>
                <Button type='link' style='color: #fff'>
                  进入系统
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
})
