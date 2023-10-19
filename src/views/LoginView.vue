<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
      <div>
        <svg class="mx-auto" width="200" height="60" xmlns="http://www.w3.org/2000/svg">
          <!-- Fusion 文字部分 -->
          <text x="30" y="40" font-family="Arial" font-size="40" font-weight="bold">
            <tspan fill="#4285F4">F</tspan>
            <tspan fill="#EA4335">u</tspan>
            <tspan fill="#FBBC05">s</tspan>
            <tspan fill="#4285F4">i</tspan>
            <tspan fill="#34A853">o</tspan>
            <tspan fill="#EA4335">n</tspan>
          </text>
        </svg>
      </div>
      <h2 class="text-2xl font-sans mb-6 text-center">
        <button
          @click="change2login"
          :class="{ 'text-black': is_login_page, 'text-gray-300': !is_login_page }"
        >
          登录
        </button>
      </h2>

      <form @submit.prevent="login">
        <div class="text-center mb-4">
          <!-- <label for="username" class="block text-gray-600 font-semibold mb-2">用户名</label> -->
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="请输入您的用户名"
            required
          />
        </div>
        <div class="text-center mb-3">
          <!-- <label for="password" class="block text-gray-600 font-semibold mb-2">密码</label> -->
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-3/4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="请输入您的密码"
            required
          />
        </div>
        <div class="mb-4 ml-12">
          <button class="text-blue-500">创建账号？</button>
        </div>
        <!-- <div class="mb-8"> -->
        <!-- <span>不是您自己的计算机？请使用访客模式无痕登录。</span> -->
        <!-- </div> -->
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-sans px-4 py-2 rounded focus:outline-none focus:ring"
          >
            <div>确认</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let is_login_page = ref(true)
    let change2login = () => {
      is_login_page.value = true
    }
    let change2register = () => {
      is_login_page.value = false
    }
    return {
      is_login_page,
      change2login,
      change2register
    }
  }
}
</script>
