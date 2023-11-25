
<template>
  <NavBar />
  <form class="min-w-[1310px] px-80" @submit.prevent="submitForm">
    <div class="border-b border-gray-900/10 pb-12 min-w-full">
      <h2 class="text-base font-semibold leading-7 text-gray-900 pt-10">用户档案</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600">
        上传用户档案，包括手机号、个人介绍、QQ 号码、微信号码、所获荣誉列表、上传的图片列表
      </p>

      <div class="mt-10 grid gap-x-6 gap-y-8 grid-cols-6">
        <div class="col-span-3 col-start-1">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            ><span class="text-red-500">*</span>手机号码</label
          >
          <div class="mt-2">
            <input
              type="text"
              v-model="user_profile_info.user_info.mobile_phone"
              name="mobile_phone"
              id="mobile_phone"
              autocomplete="address-level2"
              class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6 pl-2"
              required
            />
          </div>
        </div>

        <div class="col-span-3">
          <label class="block text-sm font-medium leading-6 text-gray-900">QQ号码</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="user_profile_info.qq_number"
              name="qq_number"
              id="qq_number"
              autocomplete="address-level1"
              class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6 pl-2"
            />
          </div>
        </div>

        <div class="col-span-3">
          <label class="block text-sm font-medium leading-6 text-gray-900">微信号码</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="user_profile_info.wechat_number"
              name="wechat_number"
              id="wechat_number"
              autocomplete="wechat_number"
              class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6 pl-2"
            />
          </div>
        </div>
        <div class="col-span-full">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            ><span class="text-red-500">*</span>个人介绍</label
          >
          <div class="mt-2">
            <textarea
              id="introduction"
              v-model="user_profile_info.introduction"
              name="introduction"
              class="py-1.5 min-h-[200px] block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6 pl-2"
              required
            />
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">介绍一下自己的能力和特长</p>
        </div>

        <div class="col-span-full">
          <label class="block text-sm font-medium leading-6 text-gray-900">荣誉列表</label>
          <p
            class="mt-2 text-sm leading-6 text-gray-600 flex items-center"
            v-for="honor in user_profile_info.honors"
            :key="honor.id"
          >
            <img src="../assets/img/honor.svg" alt="goal" class="h-6 w-6 mr-3" />
            <span class="pt-1">{{ honor }}</span>
            <img
              src="../assets/img/reduce.svg"
              alt="goal"
              @click="user_profile_info.honors.splice(user_profile_info.honors.indexOf(honor), 1)"
              class="h-4 w-4 ml-3 cursor-pointer transition-transform transform active:scale-90"
            />
          </p>
          <div class="mt-2 flex items-center gap-4">
            <input
              type="text"
              id="honors"
              v-model="honor"
              name="honors"
              class="py-1.5 w-96 block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 leading-6 pl-2"
            />
            <span
              @click="add_honor"
              class="link-hover cursor-pointer link-accent transition-transform transform active:scale-90"
              >+ 添加荣誉</span
            >
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">介绍一下自己曾获得的荣誉</p>
        </div>
      </div>
    </div>
    <div class="block mt-8 min-h-[100px] min-w-[200px]">
      <div class="float-right">
        <router-link
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          :to="{
            name: 'userprofile',
            params: { user_id: store.state.user.user_info.user_id }
          }"
        >
          Cancel
        </router-link>

        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-4"
        >
          Save
        </button>
      </div>
    </div>
  </form>
  <div class="mb-20"></div>
</template>
    
<script setup>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import $ from 'jquery'
import NavBar from '../components/NavBar.vue'
import { server_url, user_profile_upload_url, get_user_profile_url } from '../constants/constants'
import router from '@/router/index'

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
    has_profile: true
  }
})

const store = useStore()
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
      if (resp.status_code == 0) {
        Object.assign(user_profile_info, resp.user_profile_info)
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

const submitForm = () => {
  $.ajax({
    url: `${server_url}${user_profile_upload_url}`,
    type: 'POST',
    data: JSON.stringify({
      user_id: store.state.user.user_info.user_id,
      user_profile_info: user_profile_info
    }),
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
      'Content-Type': 'application/json'
    },
    success: function (resp) {
      // 处理成功的响应
      console.log(resp)
      if (resp.status_code != 0) {
        alert(resp.status_msg)
        return
      }
      store.dispatch('get_user_info', {
        user_id: store.state.user.user_info.user_id,
        token: store.state.user.token,
        success: () => {
          router.push({
            name: 'userprofile',
            params: { user_id: store.state.user.user_info.user_id }
          })
        }
      })
    },
    error: function (xhr, status, error) {
      // 处理错误
      alert(error)
    }
  })
}

const honor = ref('')
const add_honor = () => {
  if (honor.value.trim() === '') {
    return
  }
  user_profile_info.honors.push(honor.value)
  honor.value = ''
}
</script>

<style scoped>
</style>