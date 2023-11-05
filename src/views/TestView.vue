<template>
  <vue3-tinymce
    v-model="state.content"
    :setting="state.setting"
    script-src="../../public/tinymce/tinymce.min.js"
  />
</template>
  
  <script setup>
import { reactive, watch } from 'vue'
import { server_url, utils_upload_img_url } from '../constants/constants'
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce'

const setting = {
  menubar: false,
  toolbar_mode: 'sliding',
  toolbar:
    'bold italic underline h1 h2 blockquote numlist bullist link image | removeformat fullscreen',
  plugins: 'link image table lists fullscreen',
  height: 650, //编辑器高度
  min_height: 400,
  link_default_target: '_blank',
  link_title: false,
  nonbreaking_force_tab: true,
  // 自定义 图片上传模式
  custom_images_upload: true,
  // images_upload_url: `${server_url}${utils_upload_img_url}`,
  images_upload_url: `http://localhost:8888${utils_upload_img_url}`,

  custom_images_upload_callback: (resp) => {
    return resp.image_url
  },
  custom_images_upload_header: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk0NTc0NTUsIm9yaWdfaWF0IjoxNjk4ODUyNjU1LCJ1c2VyX2lkIjoxfQ.fuOSBYmoTKLNyI2SIeldBQxDzv3jVzhzJ9_Qg0Zy0yw`
  },
  // custom_images_upload_param: { id: 'xxxx01', age: 18 },

  // 以中文简体为例
  language: 'zh-Hans',
  language_url: '/tinymce/langs/zh-Hans.js'
}

const state = reactive({
  content: '',
  // editor 配置项
  setting: setting
})

watch(
  () => state.content,
  (newVal) => {
    console.log(newVal)
  }
)
</script>
  