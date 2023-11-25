<template>
  <section class="bg-white">
    <second class="flex flex-col md:flex-row h-screen items-center">
      <!-- 填写昵称、真实姓名、性别、学院、专业、QQ 账号、微信号 -->
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
          <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">请填写您的基本信息</h1>

          <form class="mt-6" @submit.prevent>
            <div class="flex flex-wrap -mx-2">
              <!-- 昵称 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span> 昵称</label>
                <input
                  type="text"
                  v-model="nickname"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <!-- 真实姓名 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"
                  ><span class="text-red-500">*</span> 真实姓名</label
                >
                <input
                  type="text"
                  v-model="realname"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <!-- 性别 -->
              <div class="w-1/4 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span>性别</label>
                <select
                  v-model="gender"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                >
                  <option value="0" selected disabled hidden></option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                </select>
              </div>

              <!-- 入学年份 -->
              <div class="w-3/4 px-2 mb-4">
                <label class="block text-gray-700"
                  ><span class="text-red-500">*</span> 入学年份（例如：2021）</label
                >
                <input
                  type="text"
                  v-model="enrollmentYear"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <!-- 手机号 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span>手机号</label>
                <input
                  type="text"
                  v-model="mobilePhone"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <!-- 学院 -->
              <div class="w-1/2 px-2 mb-4">
                <label class="block text-gray-700"><span class="text-red-500">*</span> 学院</label>
                <select
                  v-model="college"
                  class="w-full px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
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
            </div>
            <div class="error-message">{{ error_message }}</div>
            <button
              type="submit"
              class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="user_info_upload"
            >
              提交
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
import router from '@/router/index'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    // user info 内容
    let nickname = ref('')
    let realname = ref('')
    let gender = ref('')
    let mobilePhone = ref('')
    let college = ref('')
    let qqAccount = ref('')
    let weChatAccount = ref('')
    let enrollmentYear = ref('')
    let error_message = ref('')

    let checkoutUserInfo = () => {
      const phonePattern = /^1[3-9]\d{9}$/ // 手机号正则表达式
      const yearPattern = /^[1-9]\d{3}$/ // Matches a 4-digit number starting with a non-zero

      if (!nickname.value.trim() || nickname.value.length < 3 || nickname.value.length > 10) {
        error_message.value = '昵称长度应在 3 到 10 个字符之间'
        return false
      } else if (!realname.value.trim()) {
        error_message.value = '真实姓名不能为空'
        return false
      } else if (!gender.value) {
        error_message.value = '性别不能为空'
        return false
      } else if (!mobilePhone.value.trim() || !phonePattern.test(mobilePhone.value)) {
        error_message.value = '请输入有效的手机号码'
        return false
      } else if (!college.value.trim()) {
        error_message.value = '学院不能为空'
        return false
      } else if (!yearPattern.test(enrollmentYear.value)) {
        error_message.value = '入学年份格式错误，仅需填写四位年份数字'
        return false
      } else {
        error_message.value = ''
        return true
      }
    }

    let user_info_upload = () => {
      error_message.value = ''
      if (checkoutUserInfo()) {
        store.dispatch('user_info_upload', {
          token: store.state.user.token,
          user_info: {
            user_id: 0,
            gender: parseInt(gender.value),
            enrollment_year: parseInt(enrollmentYear.value),
            mobile_phone: mobilePhone.value,
            college: college.value,
            nickname: nickname.value,
            realname: realname.value,
            has_profile: false
          },
          success() {
            router.push({ name: 'home' })
          },
          error(msg) {
            error_message.value = msg
          }
        })
      }
      return
    }

    return {
      error_message,
      checkoutUserInfo,
      nickname,
      realname,
      gender,
      mobilePhone,
      college,
      qqAccount,
      weChatAccount,
      enrollmentYear,
      user_info_upload
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