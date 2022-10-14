<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="login-box-title">
        <img src="../assets/images/logo2.png" alt="icon">
        <p>账 号 登 录</p>
      </div>
      <AntdForm :model="loginForm" class="login-box-form">
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
          <AntdButton type="primary" html-type="submit" class="login-btn">登 录</AntdButton>
        </AntdFormItem>
      </AntdForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue'
  import { reactive } from 'vue'
  import { Form as AntdForm, FormItem as AntdFormItem, Input as AntdInput,
    Checkbox as AntdCheckbox, Button as AntdButton } from 'ant-design-vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

  interface FormState {
    username: string
    password: string
    remember: boolean
  }

  const loginForm: UnwrapRef<FormState> = reactive({
    username: 'admin',
    password: 'admin123',
    remember: true
  }) 
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