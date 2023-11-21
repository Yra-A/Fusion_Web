<template>
  <NavBar />
  <section>
    <div class="min-h-screen w-full bg-gradient-to-b from-blue-400 to-transparent">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div class="h-32 rounded-lg lg:col-span-2">
          <div class="pt-10 pl-60 text-3xl font-blod text-white">
            {{ $store.state.user.user_info.nickname }}的简历
          </div>
        </div>
        <div class="h-32 rounded-lg pt-10">
          <router-link
            v-if="isCurrentUser"
            class="inline-block rounded border border-current px-10 py-3 text-xl font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            :to="{ name: 'userprofileupload' }"
          >
            编辑
          </router-link>
        </div>
      </div>

      <div class="mx-auto pt-10 px-5 md:px-20 rounded-lg bg-white w-full md:w-2/3 h-4/5 shadow-xl">
        <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">基础信息</h1>
        <!-- Resume content -->
        <div class="grid grid-cols-3 gap-2">
          <div>
            <p class="infotemplate pt-5">真实姓名</p>
            <p class="">{{ realname }}</p>
            <p class="infotemplate pt-5">入学年份</p>
            <p class="">{{ enrolment_year }}</p>
            <p class="infotemplate pt-5">所属学院</p>
            <p class="">{{ college }}</p>
            <p class="infotemplate pt-5">手机号码</p>
            <p class="">{{ mobile_phone }}</p>
          </div>

          <div class="">
            <p class="infotemplate pt-5">性别</p>
            <p class="">{{ gender }}</p>
            <p class="infotemplate pt-5">QQ号码</p>
            <p class="">{{ qq_number }}</p>
            <p class="infotemplate pt-5">微信号码</p>
            <p class="">{{ wechat_number }}</p>
          </div>

          <div class="text-center">
            <input
              v-if="isCurrentUser"
              type="file"
              id="avatarUpload"
              @change="avatarUpload"
              class="sr-only"
            />
            <label for="avatarUpload" class="cursor-pointer">
              <div class="avatar">
                <a class="group relative block bg-black">
                  <img
                    alt="Developer"
                    :src="avatar_url"
                    class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div class="relative p-4 sm:p-6 lg:p-8">
                    <div class="mt-12 sm:mt-12 lg:mt-12">
                      <div
                        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 pb-20"
                      >
                        <div class="text-sm text-white">
                          <p class="ml-10 mr-10"></p>
                          <p v-if="isCurrentUser">点击上传头像</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </label>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">个人介绍</h1>
          <p class="pt-5">{{ introduction }}</p>
        </div>
        <div class="pb-20">
          <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">荣誉列表</h1>
          <ul class="pt-5">
            <li v-for="(honor, index) in honors" :key="index">{{ honor }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <div class="mb-20"></div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import $ from 'jquery'
import NavBar from '../components/NavBar.vue'
import {
  server_url,
  get_user_profile_url,
  web_user_profile_upload_url,
  web_user_profile_upload_relative_url,
  user_profile_upload_url,
  utils_upload_img_url
} from '../constants/constants'
export default {
  name: 'UserProfileView',
  components: {
    NavBar
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const realname = ref('')
    const user_id = ref(0)
    const enrolment_year = ref(0)
    const college = ref('')
    const mobile_phone = ref('')
    const gender = ref(0)
    const qq_number = ref('')
    const wechat_number = ref('')
    const introduction = ref('')
    const honors = ref([])
    const has_profile = ref(' ')
    const avatar_url = ref('')

    const user_profile_url = get_user_profile_url(store.state.user.user_info.user_id)

    const getUserProfileInfo = () => {
      //const token = store.state.user.token

      $.ajax({
        url: `${server_url}${user_profile_url}`,
        type: 'GET',
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          realname.value = resp.user_profile_info.user_info.realname
          enrolment_year.value = resp.user_profile_info.user_info.enrollment_year
          college.value = resp.user_profile_info.user_info.college
          mobile_phone.value = resp.user_profile_info.user_info.mobile_phone
          gender.value = resp.user_profile_info.user_info.gender
          qq_number.value = resp.user_profile_info.qq_number
          wechat_number.value = resp.user_profile_info.wechat_number
          introduction.value = resp.user_profile_info.introduction
          honors.value = resp.user_profile_info.honors
          avatar_url.value = resp.user_profile_info.user_info.avatar_url
          has_profile.value = resp.user_profile_info.user_info.has_profile
          user_id.value = resp.user_profile_info.user_info.user_id
        },
        error: function (xhr, status, error) {
          console.error(error)
        }
      })
    }
    getUserProfileInfo()

    if (!has_profile.value) {
      router.push(web_user_profile_upload_relative_url) // 将用户重定向到创建profile的页面
    }

    const avatarUpload = (event) => {
      const file = event.target.files[0]
      if (!file) {
        return // 如果没有文件被选中，则不执行任何操作
      }

      const formData = new FormData()
      formData.append('file', file) // 'file' 是你要在服务器端接收的字段名

      // 使用 $.ajax 发送请求
      $.ajax({
        url: `${server_url}${utils_upload_img_url}`, // 替换为你的服务器端点
        type: 'POST',
        data: formData,
        processData: false, // 告诉jQuery不要处理发送的数据
        contentType: false, // 告诉jQuery不要设置内容类型
        success: function (response) {
          updateAvatarUrl(response.image_url)
        },
        error: function (xhr, status, error) {
          console.error('Upload failed:', error)
        }
      })
    }

    function updateAvatarUrl(image_url) {
      $.ajax({
        url: `${server_url}${user_profile_upload_url}`, // 替换为您的服务器端点
        type: 'POST',
        data: { avatar_url: image_url },
        success: function (response) {
          console.log('Avatar URL updated successfully', response)
        },
        error: function (xhr, status, error) {
          console.error('Failed to update avatar URL:', error)
        }
      })
    }

    const isCurrentUser = computed(() => {
      return user_id.value === store.state.user.user_info.user_id
    })

    return {
      realname,
      enrolment_year,
      college,
      mobile_phone,
      gender,
      qq_number,
      wechat_number,
      introduction,
      honors,
      user_id,
      getUserProfileInfo,
      server_url,
      web_user_profile_upload_url,
      avatarUpload,
      user_profile_url,
      user_profile_upload_url,
      store,
      has_profile,
      web_user_profile_upload_relative_url,
      avatar_url,
      isCurrentUser,
      updateAvatarUrl,
      utils_upload_img_url
      //token
    }
  }
}
</script>

<style scoped>
.infotemplate {
  color: gray;
  font-size: 15px;
}
</style>
