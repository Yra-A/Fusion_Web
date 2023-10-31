<template>
  <section class="bg-white">
    <second class="flex flex-col md:flex-row h-screen items-center">
      <!-- 填写用户名、密码、确认密码 -->
      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
      >
        <div class="w-full h-100">
          <div>
            <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
              <!-- Fusion 文字部分 -->
              <text x="0" y="40" font-family="Arial" font-size="40" font-weight="bold">
                <tspan fill="#4285F4">F</tspan>
                <tspan fill="#EA4335">u</tspan>
                <tspan fill="#FBBC05">s</tspan>
                <tspan fill="#4285F4">i</tspan>
                <tspan fill="#34A853">o</tspan>
                <tspan fill="#EA4335">n</tspan>
              </text>
            </svg>
          </div>
          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">注册</h1>

          <form class="mt-6" @submit.prevent>
            <div>
              <label class="block text-gray-700">用户名</label>
              <input
                type="text"
                v-model="username"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="用户名应为 6 - 32 位"
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">密码</label>
              <input
                type="password"
                v-model="password"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="密码应为 8 - 16 位"
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">确认密码</label>
              <input
                type="password"
                v-model="confirm_password"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            <div class="error-message">{{ error_message }}</div>
            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="register"
            >
              注册
            </button>
          </form>

          <p class="mt-8">
            已经拥有账号?
            <router-link
              :to="{ name: 'login' }"
              class="text-blue-500 hover:text-blue-700 font-semibold"
              >直接登录</router-link
            >
          </p>

          <p class="text-sm text-gray-500 mt-12">
            &copy; 2023 SHNU CoderSky - All Rights Reserved.
          </p>
        </div>
      </div>

      <div class="hidden lg:block w-full md:w-1/2 h-screen">
        <img
          src="../assets/img/fusion-sky-skyscrapers.png"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
    </second>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    // account 内容
    let username = ref('')
    let password = ref('')
    let confirm_password = ref('')
    let error_message = ref('')

    let checkoutUserAccount = () => {
      const username_len = username.value.length
      const password_len = password.value.length

      // 检查输入是否为空
      if (!username.value.trim() || !password.value.trim() || !confirm_password.value.trim()) {
        error_message.value = '用户名、密码或确认密码不能为空'
        password.value = ''
        confirm_password.value = ''
        return false
      } else if (username_len < 6 || username_len > 32 || password_len < 8 || password_len > 16) {
        error_message.value = '用户名或密码格式错误\n用户名为 6 - 32 位，密码为 8 - 16 位'
        password.value = ''
        confirm_password.value = ''
        return false
      } else if (password.value != confirm_password.value) {
        error_message.value = '两次输入的密码不一致'
        password.value = ''
        confirm_password.value = ''
        return false
      } else {
        error_message.value = ''
        return true
      }
    }

    let register = () => {
      error_message.value = ''
      if (checkoutUserAccount()) {
        store.dispatch('register', {
          username: username.value,
          password: password.value,
          error(msg) {
            error_message.value = msg
          }
        })
      }
      return
    }

    return {
      username,
      password,
      confirm_password,
      error_message,
      checkoutUserAccount,
      register
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  white-space: pre-line;
}
</style>