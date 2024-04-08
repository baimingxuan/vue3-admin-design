import type { LoginFormState } from '@/types'
import { defineComponent } from 'vue'
import { ref, unref, reactive } from 'vue'
import { Form, Input, Checkbox, Button, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import logoIcon from '@/assets/images/logo_name.png'
import styles from './index.module.less'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const loginFormState = reactive<LoginFormState>({
      username: 'admin',
      password: '123456',
      remember: true
    })
    const loading = ref(false)

    const userStore = useUserStore()

    const handleLogin = async (form: LoginFormState) => {
      try {
        loading.value = true
        const userInfo = await userStore.login({
          username: form.username,
          password: form.password,
          remember: form.remember
        })
        if (userInfo) {
          message.success('登陆成功！')
        }
      } catch (error) {
        message.error((error as unknown as Error).message)
      } finally {
        loading.value = false
      }
    }

    return () => (
      <div class={styles['login-wrapper']}>
        <div class={styles['login-box']}>
          <div class={styles['login-box-title']}>
            <img src={logoIcon} alt='icon' />
            <p>账 号 登 录</p>
          </div>
          <Form model={loginFormState} class={styles['login-box-form']} autocomplete={false} onFinish={handleLogin}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
              <Input
                v-model:value={loginFormState.username}
                prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                placeholder='请输入账号'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input
                type='password'
                v-model:value={loginFormState.password}
                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                placeholder='请输入密码'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' class={['fl', styles['no-margin']]}>
                <Checkbox v-model:checked={loginFormState.remember}>记住我</Checkbox>
              </Form.Item>
              <Form.Item class={['fr', styles['no-margin']]}>
                <a href=''>忘记密码？</a>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' class={styles['login-btn']} loading={unref(loading)}>
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
})
