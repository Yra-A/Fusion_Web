<template>
  <NavBar />
  <section>
    <div class="min-h-screen min-w-[1400px] w-full bg-gradient-to-b from-blue-400 to-transparent">
      <div class="mx-auto min-w-[980px] w-2/3 flex justify-between pt-10">
        <div
          class="justify-start h-32 rounded-lg col-span-2 pl-14 text-4xl font-blod text-white flex items-center"
        >
          您的档案
        </div>
        <div class="justify-end h-32 pr-14 rounded-lg flex items-center">
          <router-link
            v-if="isCurrentUser"
            class="inline-block rounded border border-current px-10 py-3 text-2xl font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            :to="{ name: 'userprofileupload' }"
          >
            编辑
          </router-link>
        </div>
      </div>

      <div class="mx-auto min-w-[980px] pt-10 px-20 rounded-lg bg-white w-2/3 h-4/5 shadow-xl">
        <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">基础信息</h1>
        <!-- Resume content -->
        <div class="grid grid-cols-3 gap-2">
          <div>
            <p class="infotemplate pt-5">真实姓名</p>
            <p class="mt-2">{{ user_profile_info.user_info.realname }}</p>
            <p class="infotemplate pt-5">入学年份</p>
            <p class="mt-2">{{ user_profile_info.user_info.enrollment_year }} 级</p>
            <p class="infotemplate pt-5">所属学院</p>
            <p class="mt-2">{{ user_profile_info.user_info.college }}</p>
            <p class="infotemplate pt-5">手机号码</p>
            <p class="mt-2">{{ user_profile_info.user_info.mobile_phone }}</p>
          </div>

          <div class="">
            <p class="infotemplate pt-5">性别</p>
            <p v-if="user_profile_info.user_info.gender == 1" class="mt-2">男</p>
            <p v-else-if="user_profile_info.user_info.gender == 2" class="mt-2">女</p>
            <p v-else class="mt-2">未知</p>
            <p class="infotemplate pt-5">QQ号码</p>
            <p class="mt-2">{{ user_profile_info.qq_number }}</p>
            <p class="infotemplate pt-5">微信号码</p>
            <p class="mt-2">{{ user_profile_info.wechat_number }}</p>
          </div>

          <div class="text-center">
            <!-- 仅当 isCurrentUser 为真时显示上传控件和悬浮效果 -->
            <div v-if="isCurrentUser" class="relative">
              <input type="file" id="avatarUpload" @change="avatarUpload" class="sr-only" />
              <label for="avatarUpload" class="cursor-pointer">
                <img
                  v-if="user_profile_info.user_info.avatar_url != ''"
                  :src="user_profile_info.user_info.avatar_url"
                  class="rounded-full w-[170px] h-[170px] object-cover transition-opacity"
                />
                <img
                  v-else
                  src="../assets/img/defaultAvatar.svg"
                  class="rounded-full w-[170px] h-[170px] object-cover transition-opacity"
                />
                <div
                  class="absolute inset-0 w-[170px] bg-black bg-opacity-0 flex items-center justify-center opacity-0 hover:bg-opacity-50 hover:opacity-100 transition-opacity"
                >
                  <p class="text-white">点击上传头像</p>
                </div>
              </label>
            </div>

            <!-- 当 isCurrentUser 为假时，仅显示图片 -->
            <div v-else>
              <img
                alt="Developer"
                :src="user_profile_info.user_info.avatar_url"
                class="rounded-full max-w-[180px] object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">个人介绍</h1>
          <p class="pt-5">{{ user_profile_info.introduction }}</p>
        </div>
        <div class="pb-20">
          <h1 class="text-2xl font-bold border-b-2 border-gray-30 inline-block pt-10">荣誉列表</h1>
          <li
            v-for="(honor, index) in user_profile_info.honors"
            :key="index"
            class="mt-2 text-base leading-6 text-gray-800 flex items-center"
          >
            <img src="../assets/img/honor.svg" alt="goal" class="h-6 w-6 mr-3" />
            <span class="pt-1">{{ honor }}</span>
          </li>
        </div>
      </div>
    </div>
  </section>
  <div class="mb-20"></div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'
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

    const user_profile_info = reactive({
      introduction: '',
      qq_number: '',
      wechat_number: '',
      honors: [''],
      user_info: {
        user_id: 0,
        gender: 0,
        enrollment_year: 0,
        mobile_phone: '',
        college: '',
        nickname: '',
        realname: '',
        avatar_url: '',
        has_profile: false
      }
    })

    const user_profile_url = get_user_profile_url(store.state.user.user_info.user_id)

    const getUserProfileInfo = () => {
      $.ajax({
        url: `${server_url}${user_profile_url}`,
        type: 'GET',
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          if (resp.status_code == 0) {
            Object.assign(user_profile_info, resp.user_profile_info)
            if (
              resp.user_profile_info.user_info.user_id == store.state.user.user_info.user_id &&
              !resp.user_profile_info.user_info.has_profile
            ) {
              // 如果是自己的 profile 界面，并且没有创建 profile，则跳转到创建 profile 的界面
              router.push({
                name: 'userprofileupload'
              })
            }
          } else {
            alert(resp.status_msg)
          }
        },
        error: function (xhr, status, error) {
          alert(error)
        }
      })
    }
    getUserProfileInfo()

    const avatarUpload = (event) => {
      if (user_profile_info.user_info.user_id != store.state.user.user_info.user_id) {
        alert('您没有权限修改他人的头像')
        return
      }
      const file = event.target.files[0]
      if (!file) {
        return // 如果没有文件被选中，则不执行任何操作
      }

      const formData = new FormData()
      formData.append('file', file)

      // 使用 $.ajax 发送请求
      $.ajax({
        url: `${server_url}${utils_upload_img_url}`, // 替换为你的服务器端点
        type: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        },
        processData: false, // 告诉jQuery不要处理发送的数据
        contentType: false, // 告诉jQuery不要设置内容类型
        success: function (resp) {
          if (resp.status_code == 0) {
            updateAvatarUrl(resp.image_url)
          } else {
            alert(resp.status_msg)
          }
        },
        error: function (xhr, status, error) {
          alert(error)
        }
      })
    }

    const updateAvatarUrl = (image_url) => {
      let new_user_profile_info = user_profile_info
      new_user_profile_info.user_info.avatar_url = image_url
      $.ajax({
        url: `${server_url}${user_profile_upload_url}`,
        type: 'POST',
        data: JSON.stringify({
          user_id: store.state.user.user_info.user_id,
          user_profile_info: new_user_profile_info
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          // 处理成功的响应
          console.log(resp)
          if (resp.status_code != 0) {
            alert(resp.status_msg)
            return
          }
          user_profile_info.user_info.avatar_url = image_url
          store.dispatch('get_user_info', {
            user_id: store.state.user.user_info.user_id,
            token: store.state.user.token,
            success: () => {}
          })
        },
        error: function (xhr, status, error) {
          // 处理错误
          alert(error)
        }
      })
    }

    const isCurrentUser = computed(() => {
      return user_profile_info.user_info.user_id === store.state.user.user_info.user_id
    })

    return {
      user_profile_info,
      getUserProfileInfo,
      server_url,
      web_user_profile_upload_url,
      avatarUpload,
      user_profile_url,
      user_profile_upload_url,
      store,
      web_user_profile_upload_relative_url,
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
