<template>
  <vue3-tinymce v-model="content" :setting="setting" script-src="/fusion/tinymce/tinymce.min.js" />
</template>
  
  <script setup>
import { watch, ref } from 'vue'
import { server_url, utils_upload_img_url } from '../constants/constants'
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce'

const props = defineProps({
  description: {
    type: String,
    default: ''
  }
})

const setting = {
  menubar: false,
  toolbar_mode: 'sliding',
  toolbar:
    'bold italic underline h1 h2 blockquote numlist bullist link image | removeformat fullscreen',
  plugins: 'link image table lists fullscreen',
  height: 500, //编辑器高度
  min_height: 500,
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
  language_url: '/fusion/tinymce/langs/zh-Hans.js'
}

const content = ref('')
content.value = props.description

const emit = defineEmits(['update-content'])

// 监听内部状态变化，并向父组件发射事件
watch(content, (newValue) => {
  emit('update-content', newValue)
})
</script>
  