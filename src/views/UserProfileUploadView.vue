
<template>
  <NavBar />
  <form @submit.prevent="submitForm">
    <div class="space-y-12 pl-20">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">用户档案</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          上传用户档案，包括手机号、个人介绍、QQ 号码、微信号码、所获荣誉列表、上传的图片列表
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3 sm:col-start-1">
            <label for="mobile_phone" class="block text-sm font-medium leading-6 text-gray-900"
              >手机号码</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="mobile_phone"
                id="mobile_phone"
                autocomplete="address-level2"
                class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="qq_number" class="block text-sm font-medium leading-6 text-gray-900"
              >QQ号码</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="qq_number"
                id="qq_number"
                autocomplete="address-level1"
                class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
              >微信号码</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="wechat_number"
                id="wechat_number"
                autocomplete="wechat_number"
                class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
              />
            </div>
          </div>
          <div class="col-span-full">
            <label for="introduction" class="block text-sm font-medium leading-6 text-gray-900"
              >个人介绍</label
            >
            <div class="mt-2">
              <textarea
                id="introduction"
                name="introduction"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">介绍一下自己的能力和特长</p>
          </div>

          <div class="col-span-full">
            <label for="honors" class="block text-sm font-medium leading-6 text-gray-900"
              >荣誉列表</label
            >
            <div class="mt-2">
              <textarea
                id="honors"
                name="honors"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">介绍一下自己曾获得的荣誉</p>
          </div>
          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
              >图片列表</label
            >
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div class="text-center">
                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>
    
<script >
import { ref } from 'vue'
import $ from 'jquery'
import { PhotoIcon } from '@heroicons/vue/24/solid'
import NavBar from '../components/NavBar.vue'
export default {
  name: 'UserProfileUploadView',
  components: {
    NavBar,
    PhotoIcon
  },
  setup() {
    const formData = ref({
      mobilePhone: '',
      qqNumber: '',
      wechatNumber: '',
      introduction: '',
      honors: '',
      imageFile: null
    })
    const submitForm = async () => {
      const url = 'http://127.0.0.1:4523/m1/3429271-0-default/user/profile/upload'

      $.ajax({
        url: url,
        type: 'POST',
        data: formData.value,
        success: function (response) {
          // 处理成功的响应
          console.log(response)
        },
        error: function (xhr, status, error) {
          // 处理错误
          console.error(error)
        }
      })
    }
    return {
      formData,
      submitForm
    }
  }
}
</script>
  
<style scoped>
</style>