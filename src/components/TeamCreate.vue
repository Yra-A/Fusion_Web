<template>
  <form @submit.prevent="submitTeamCreate">
    <div class="space-y-8 px-2">
      <!-- Top -->
      <div>
        <div class="border-b pb-2">
          <span class="text-2xl font-semibold leading-7 text-gray-900">填写队伍信息</span>
          <p class="mt-2 text-sm leading-6 text-gray-600">
            您创建的队伍将会在赛事板块中展示，创建成功后您可以随时修改队伍信息
          </p>
        </div>

        <div class="mt-4 grid gap-x-6 gap-y-5 grid-cols-6">
          <!-- 标题 -->
          <div class="col-span-full">
            <div class="flex items-center">
              <img src="../assets/img/idea.svg" alt="title" class="h-5 w-5 mr-1" />
              <div for="username" class="block text-base font-medium leading-6 text-gray-900">
                队伍标题
              </div>
              <div class="flex ml-3 bg-yellow-200 items-center px-2 py-0 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current shrink-0 h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 22"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span class="text-sm"
                  >标题格式建议：[目标角色 + 数量] / [目标角色 + 数量] / [目标角色 +
                  数量]......</span
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                type="text"
                name="team-title"
                v-model="team_title"
                id="team-title"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                maxlength="50"
                placeholder="例如：美术设计 1 名 / 程序员 2 名 / 策划 1 名"
              />
            </div>
          </div>

          <!-- 目标 -->
          <div class="col-span-full">
            <div class="flex items-center">
              <img src="../assets/img/goal.svg" alt="goal" class="h-5 w-5 mr-1" />
              <div for="username" class="block text-base font-medium leading-6 text-gray-900">
                目标
              </div>
            </div>
            <div class="mt-2">
              <input
                type="text"
                name="team-goal"
                id="team-goal"
                v-model="team_goal"
                class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                maxlength="50"
                placeholder="例如：冲击国赛金牌！"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div>
        <div class="flex items-center mb-4">
          <img src="../assets/img/note.svg" alt="description" class="h-6 w-6 mr-2" />
          <h2 class="text-base font-semibold leading-7 text-gray-900">队伍详细介绍</h2>
        </div>
        <!-- <p class="mt-1 mb-3 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p> -->

        <RichText :description="description" @update-content="description_update" />
        <div class="error-message mt-2 ml-1">{{ error_message }}</div>
      </div>
    </div>
    <!-- Button -->
    <div class="mt-3 flex items-center justify-end mr-2">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-transform transform active:scale-90"
      >
        提交
      </button>
    </div>
  </form>
</template>

<script setup>
import RichText from './RichText.vue'
import { ref } from 'vue'
import $ from 'jquery'
import { server_url, team_create_url } from '../constants/constants'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  initial_team_info: {
    type: Object,
    default: () => {
      return {
        team_id: 0,
        contest_id: 0,
        title: '',
        goal: '',
        description: ''
      }
    }
  }
})

const error_message = ref('')
const team_title = ref('')
const team_goal = ref('')
const description = ref('')

team_title.value = props.initial_team_info.title
team_goal.value = props.initial_team_info.goal
description.value = props.initial_team_info.description

// watch(
//   props.initial_team_info,
//   (newVal) => {
//     ;(team_title.value = newVal.title),
//       (team_goal.value = newVal.goal),
//       (description.value = newVal.description)
//   },
//   { immediate: true, deep: true }
// )

const description_update = (content) => {
  description.value = content
}

const submitTeamCreate = () => {
  error_message.value = ''
  if (team_title.value === '') {
    error_message.value = '队伍标题不能为空'
    return
  }
  if (team_goal.value === '') {
    error_message.value = '队伍目标不能为空'
    return
  }
  if (description.value === '') {
    error_message.value = '队伍介绍不能为空'
    return
  }
  $.ajax({
    url: `${server_url}${team_create_url}`,
    type: 'POST',
    data: JSON.stringify({
      user_id: store.state.user.user_id,
      team_id: props.initial_team_info.team_id,
      contest_id: props.initial_team_info.contest_id,
      title: team_title.value,
      goal: team_goal.value,
      description: description.value
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.state.user.token}`
    },
    success: function (resp) {
      console.log(resp)
    },
    error: function (error) {
      console.error('Error fetching teams:', error)
    }
  })
}
</script>

<style scoped>
.error-message {
  color: red;
  white-space: pre-line;
}
</style>