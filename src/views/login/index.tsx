import type { LoginFormState } from '@/types'
import { defineComponent } from 'vue'
import { ref, unref, reactive } from 'vue'
import { Form, Input, Checkbox, Button, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/modules/user'
import { AppLocalePicker } from '@/components/Application'
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

    const { t } = useI18n()
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
          message.success(`${t('system.login.loginSuccessTip')}`)
        }
      } catch (error) {
        message.error((error as unknown as Error).message)
      } finally {
        loading.value = false
      }
    }

    return () => (
      <div class={styles['login-wrapper']}>
        <div class={styles['login-setting']}>
          <AppLocalePicker />
        </div>
        <div class={styles['login-box']}>
          <div class={styles['login-box-title']}>
            <img src={logoIcon} alt='icon' />
            <p>{t('system.login.accountLogin')}</p>
          </div>
          <Form model={loginFormState} class={styles['login-box-form']} autocomplete={false} onFinish={handleLogin}>
            <Form.Item name='username' rules={[{ required: true, message: `${t('system.login.accountMsg')}` }]}>
              <Input
                v-model:value={loginFormState.username}
                prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                placeholder={t('system.login.accountMsg')}
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: `${t('system.login.passwordMsg')}` }]}>
              <Input
                type='password'
                v-model:value={loginFormState.password}
                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                placeholder={t('system.login.passwordMsg')}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' class={['fl', styles['no-margin']]}>
                <Checkbox v-model:checked={loginFormState.remember}>{t('system.login.rememberMe')}</Checkbox>
              </Form.Item>
              <Form.Item class={['fr', styles['no-margin']]}>
                <a href=''>{t('system.login.forgetPassword')}</a>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' class={styles['login-btn']} loading={unref(loading)}>
                {t('system.login.loginButton')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
})
