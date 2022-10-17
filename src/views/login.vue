<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-box-title">
        <img src="../assets/images/logo2.png" alt="icon">
        <p>账 号 登 录</p>
      </div>
      <AntdForm
        ref="loginFormRef"
        :model="loginForm"
        class="login-box-form"
        @keypress.enter="handleLogin"
      >
        <AntdFormItem name="username" :rules="[{ required: true, message: '请输入账号' }]">
          <AntdInput v-model:value="loginForm.username" placeholder="请输入账号">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </AntdInput>
        </AntdFormItem>
        <AntdFormItem name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <AntdInput v-model:value="loginForm.password" type="password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </AntdInput>
        </AntdFormItem>
        <AntdFormItem>
          <AntdFormItem name="remember" no-style>
            <AntdCheckbox v-model:checked="loginForm.remember">记住我</AntdCheckbox>
          </AntdFormItem>
          <a class="fr" href="">忘记密码？</a>
        </AntdFormItem>
        <AntdFormItem>
          <AntdButton
            type="primary"
            html-type="submit"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >登 录</AntdButton>
        </AntdFormItem>
      </AntdForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue'
  import type { FormInstance } from 'ant-design-vue'

  import { ref, unref, reactive } from 'vue'
  import { Form as AntdForm, FormItem as AntdFormItem, Input as AntdInput,
    Checkbox as AntdCheckbox, Button as AntdButton, message as AntdMessage } from 'ant-design-vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { useUserStore } from '@/stores/modules/user'

  interface FormState {
    username: string
    password: string
    remember: boolean
  }

  const loginForm: UnwrapRef<FormState> = reactive({
    username: 'admin',
    password: '123456',
    remember: true
  })

  const loading = ref(false)
  const loginFormRef = ref<FormInstance>()
  const userStore = useUserStore()

  async function handleLogin() {
    const form = unref(loginFormRef)
    const data = await form?.validate()
    if (!data) return

    try {
      loading.value = true
      const userInfo = await userStore.login({
        username: data.username,
        password: data.password
      })
      if (userInfo) {
        AntdMessage.success('登陆成功！')
      }
    } catch (error) {
      AntdMessage.error((error as unknown as Error).message)
    } finally {
      loading.value = false
    }
  }

</script>

<style lang="less" scoped>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/images/login-background.jpg);
    background-size: cover;

    .login-box {
      padding: 15px 30px 20px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 15px 30px 0 rgba(0, 0, 1, .1);

      &-title {
        margin: 0 auto 35px;
        text-align: center;
        color: #707070;
        font-size: 18px;
        letter-spacing: 2px;
      }

      &-form {
        width: 320px;
      }

      .login-btn {
        width: 100%;
      }
    }
  }
</style>