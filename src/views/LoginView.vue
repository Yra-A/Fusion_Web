<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        src="../assets/img/fusion-sky-skyscrapers.png"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <div>
          <svg class="" width="200" height="60" xmlns="http://www.w3.org/2000/svg">
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
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">登录</h1>

        <form class="mt-6" @submit.prevent="login">
          <div>
            <label class="block text-gray-700">用户名</label>
            <input
              v-model="username"
              type="username"
              class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              required
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">密码</label>
            <input
              v-model="password"
              type="password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
            />
          </div>

          <div class="text-right mt-2">
            <a
              href="#"
              class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >【TODO】忘记密码?</a
            >
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button
            type="submit"
            class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            @click="login"
          >
            登录
          </button>
        </form>

        <hr class="my-6 border-gray-300 w-full" />

        <button
          type="button"
          class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div class="flex items-center justify-center">
            <!-- SVG for Google icon... -->
            <span class="ml-4"> TODO：Log in with Google </span>
          </div>
        </button>

        <p class="mt-8">
          需要一个账号?
          <router-link
            :to="{ name: 'register' }"
            class="text-blue-500 hover:text-blue-700 font-semibold"
            >注册账号</router-link
          >
        </p>

        <p class="text-sm text-gray-500 mt-12">&copy; 2023 SHNU CoderSky - All Rights Reserved.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/index'

export default {
  name: 'LoginView',
  components: {},
  setup() {
    const store = useStore()
    let username = ref('')
    let password = ref('')
    let error_message = ref('')

    const login = () => {
      error_message.value = ''
      store.dispatch('login', {
        username: username.value,
        password: password.value,
        success() {
          router.push({ name: 'home' })
        },
        error() {
          error_message.value = '用户名或密码错误'
        }
      })
    }

    return {
      username,
      password,
      error_message,
      login
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
