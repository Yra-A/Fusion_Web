<template>
  <section class="bg-white">
    <second class="flex flex-col md:flex-row h-screen items-center">
      <!-- 第一步：填写用户名、密码、确认密码 -->
      <div
        v-if="register_step == 0"
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
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">密码</label>
              <input
                type="password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div class="mt-4">
              <label class="block text-gray-700">确认密码</label>
              <input
                type="password"
                minlength="6"
                class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="next_step"
            >
              下一步
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

      <!-- 第二步：填写昵称、真实姓名、性别、学院、专业、QQ 账号、微信号 -->
      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
        v-if="register_step == 1"
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
          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">请填写您的基本信息</h1>

          <form class="mt-6" @submit.prevent>
            <div class="flex flex-wrap -mx-2">
              <!-- 昵称 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span> 昵称</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <!-- 真实姓名 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"
                  ><span class="text-red-500">*</span> 真实姓名</label
                >
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <!-- 性别 -->
              <div class="w-1/4 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span>性别</label>
                <select
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                >
                  <option value="" selected disabled hidden></option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>

              <!-- 手机号 -->
              <div class="w-3/4 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span>手机号</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <!-- 学院 -->
              <div class="w-full px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span> 学院</label>
                <select
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                >
                  <option value="" selected disabled hidden></option>
                  <option value="人文学院">人文学院</option>
                  <option value="教育学院">教育学院</option>
                  <option value="学前教育学院">学前教育学院</option>
                  <option value="哲学与法政学院">哲学与法政学院</option>
                  <option value="马克思主义学院">马克思主义学院</option>
                  <option value="外国语学院">外国语学院</option>
                  <option value="商学院">商学院</option>
                  <option value="对外汉语学院">对外汉语学院</option>
                  <option value="旅游学院">旅游学院</option>
                  <option value="音乐学院">音乐学院</option>
                  <option value="美术学院">美术学院</option>
                  <option value="影视传媒学院">影视传媒学院</option>
                  <option value="体育学院">体育学院</option>
                  <option value="数理学院">数理学院</option>
                  <option value="生命科学学院">生命科学学院</option>
                  <option value="化学与材料科学学院">化学与材料科学学院</option>
                  <option value="环境与地理科学学院">环境与地理科学学院</option>
                  <option value="信息与机电工程学院">信息与机电工程学院</option>
                  <option value="建筑工程学院">建筑工程学院</option>
                  <option value="上海退役军人学院">上海退役军人学院</option>
                  <option value="继续教育学院">继续教育学院</option>
                </select>
              </div>

              <!-- QQ 账号 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700">QQ 账号</label>
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <!-- 微信号 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700">微信号</label>
                <input
                  type="password"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="register_step -= 1"
            >
              下一步
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

export default {
  setup() {
    let register_step = ref(0)

    let next_step = () => {
      register_step.value += 1
    }

    return {
      register_step,
      next_step
    }
  }
}
</script>