<template>
  <div class="flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <div class="flex mx-auto mt-4 justify-center">
      <!-- Left Side -->
      <div
        class="sm:h-[85vh] sm:overflow-y-scroll min-w-[500px] content-cen w-80 bg-white p-8 pt-5 rounded shadow-xl"
      >
        <div class="mb-6 mt-2 ml-0 flex justify-between">
          <!-- 返回按钮 -->
          <router-link
            :to="{ name: 'teamlist', params: { contest_id: contest_id } }"
            class="flex justify-start hover:cursor-pointer transition-transform transform active:scale-90"
          >
            <img src="../assets/img/back.svg" class="h-6 w-6" />
            <span class="text-base">返回</span>
          </router-link>

          <!-- 申请加入 / 管理队伍信息 -->
          <!-- You can open the modal using ID.showModal() method -->
          <button
            v-if="role == 0"
            class="flex justify-end text-lg font-semibold text-blue-700 hover:text-blue-500 transition-transform transform active:scale-90"
            onclick="dialog_apply.showModal()"
          >
            申请加入
          </button>

          <!-- 队长的按钮 -->
          <div v-else-if="role == 2" class="flex gap-4">
            <!-- 已收到的申请 -->
            <button
              class="flex justify-end text-lg font-semibold text-blue-700 hover:text-blue-500 transition-transform transform active:scale-90"
              onclick="dialog_manage_apply.showModal()"
              @click="get_team_application_list"
            >
              已收到的申请
            </button>
            <!-- 修改队伍信息 -->
            <button
              v-if="cur_team_info.team_id != 0"
              class="flex justify-end text-lg font-semibold text-blue-700 hover:text-blue-500 transition-transform transform active:scale-90"
              @click="what_page = 1"
            >
              修改队伍信息
            </button>
          </div>

          <!-- dialog 申请入队-->
          <dialog id="dialog_apply" class="modal modal-scroll" :close-on-press-escape="false">
            <div class="modal-box min-h-[658px]">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
                  ✕
                </button>
              </form>
              <h3 class="font-bold text-lg flex items-center gap-2 mb-5">
                <img src="../assets/img/apply.svg" alt="apply" class="w-6 h-6" />申请加入队伍
              </h3>
              <form @submit.prevent="submit_join_application">
                <textarea
                  v-model="join_reason"
                  required
                  class="textarea-mt-1 mb-2 w-full rounded-md border-2 p-2 min-h-[500px] border-gray-600 focus:border-indigo-300"
                  placeholder="向队长简单介绍一下你吧~"
                />
                <div class="flex justify-end">
                  <button type="submit" class="btn text-lg">提交</button>
                </div>
              </form>
            </div>
          </dialog>

          <!-- dialog 查看已收到的申请 -->
          <dialog
            id="dialog_manage_apply"
            class="modal modal-scroll"
            :close-on-press-escape="false"
          >
            <div class="modal-box min-h-[658px]">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
                  ✕
                </button>
              </form>
              <h3 class="font-bold text-lg flex items-center gap-2 mb-5">
                <img
                  src="../assets/img/collaborate.svg"
                  alt="apply"
                  class="w-6 h-6"
                />队伍已收到的申请
              </h3>
              <div class="hs-accordion-group" data-hs-accordion-always-open>
                <div
                  v-for="application in team_applications"
                  :key="application.application_id"
                  class="hs-accordion shadow rounded-lg"
                >
                  <!-- 入队申请 -->
                  <div v-if="application.application_type == 1">
                    <button
                      class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
                    >
                      <div class="pb-3 mb-1 flex">
                        <router-link
                          :to="{
                            name: 'userprofile',
                            params: { user_id: application.member_info.user_id }
                          }"
                          target="_blank"
                        >
                          <img
                            :src="application.member_info.avatar_url"
                            class="rounded-full h-10 w-10 mt-1 hover:scale-125 hover:ring-4 transform transition duration-100"
                            @click.stop
                          />
                        </router-link>
                        <div class="ml-5 flex flex-col">
                          <div>
                            <span class="font-semibold text-base align-middle">{{
                              application.member_info.nickname
                            }}</span>
                            <img
                              v-if="application.member_info.gender === 1"
                              src="../assets/img/male.svg"
                              class="inline-block ml-1 h-4 w-4 align-middle"
                            />
                            <img
                              v-else
                              src="../assets/img/female.svg"
                              class="inline-block ml-1 h-4 w-4 align-middle"
                            />
                          </div>
                          <span class="text-xs block"
                            >{{ application.member_info.enrollment_year }} 级 •
                            {{ application.member_info.college }}</span
                          >
                        </div>
                      </div>
                      <svg
                        class="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                      <svg
                        class="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    <!-- 处理请求按钮 -->
                    <div
                      class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300 px-4 pb-4"
                    >
                      <p class="text-gray-800 dark:text-gray-200">
                        {{ application.reason }}
                      </p>
                      <div class="flex justify-end gap-2 mt-2 mr-2">
                        <button
                          class="bg-red-500 text-white px-2 rounded hover:bg-red-700 ease-in-out duration-100 h-7 transition-transform transform active:scale-90"
                          @click="reject_application(application.application_id)"
                        >
                          <span class="text-sm font-bold">拒绝</span>
                        </button>
                        <button
                          class="bg-green-500 text-white px-2 rounded hover:bg-green-700 ease-in-out duration-100 h-7 transition-transform transform active:scale-90"
                          @click="accept_application(application.application_id)"
                        >
                          <span class="text-sm font-bold">接受</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        </div>
        <!-- <hr class="border-t border-gray-300 my-4" /> -->
        <!-- 队长 -->
        <div class="flex flex-col mb-3 pb-1">
          <div class="pb-3 mb-1 flex">
            <img
              :src="team.team_brief_info.leader_info.avatar_url"
              class="rounded-full h-12 w-12 mt-2"
            />
            <div class="ml-5 flex flex-col">
              <div>
                <span class="font-semibold text-xl align-middle">{{
                  team.team_brief_info.leader_info.nickname
                }}</span>
                <img
                  v-if="team.team_brief_info.leader_info.gender == 1"
                  src="../assets/img/male.svg"
                  class="inline-block ml-1 h-4 w-4 align-middle"
                />
                <img
                  v-else
                  src="../assets/img/female.svg"
                  class="inline-block ml-1 h-4 w-4 align-middle"
                />
              </div>
              <span class="text-gray-500 text-base block"
                >{{ team.team_brief_info.leader_info.enrollment_year }} 级 •
                {{ team.team_brief_info.leader_info.college }}</span
              >
              <span class="text-sm text-gray-400 block">
                团队创建时间 - {{ formattedCreatedTime(team.team_brief_info.created_time) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 成员列表 -->
        <div class="flex flex-col">
          <!-- <div class="pb-3 mb-3 indent-8 text-gray-900">{{ contest.description }}</div> -->
          <h2
            class="mb-5 flex items-center text-lg font-medium leading-7 text-slate-900 pb-2 border-b"
          >
            <img src="../assets/img/pink_icon.svg" class="h-4 w-4" />
            <span class="ml-2.5 mr-3">成员列表: </span>
            <span class="flex text-center font-semibold text-lg">
              <div style="min-width: 20px">当前 5 人</div>
            </span>
          </h2>
          <div class="hs-accordion-group" data-hs-accordion-always-open>
            <div
              class="hs-accordion shadow rounded-lg"
              v-for="member in team.members"
              :key="member.user_id"
            >
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <router-link
                    v-if="role == 1 || role == 2"
                    :to="{
                      name: 'userprofile',
                      params: { user_id: member.user_id }
                    }"
                    target="_blank"
                  >
                    <img
                      :src="member.avatar_url"
                      class="rounded-full h-10 w-10 mt-1 hover:scale-125 hover:ring-4 transform transition duration-100"
                      @click.stop
                    />
                  </router-link>
                  <div v-else>
                    <img
                      :src="member.avatar_url"
                      class="rounded-full h-10 w-10 mt-1 hover:scale-125 hover:ring-4 transform transition duration-100"
                      @click.stop
                    />
                  </div>
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle">
                        {{ member.nickname }}
                      </span>
                      <img
                        v-if="member.gender == 1"
                        src="../assets/img/male.svg"
                        class="inline-block ml-1 h-4 w-4 align-middle"
                      />
                      <!-- 当 gender 不为 1 时，显示female图标 -->
                      <img
                        v-else
                        src="../assets/img/female.svg"
                        class="inline-block ml-1 h-4 w-4 align-middle"
                      />
                    </div>
                    <span class="text-xs block">
                      {{ member.enrollment_year }} 级 • {{ member.college }}</span
                    >
                  </div>
                </div>
                <svg
                  class="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  class="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <div
                class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300 px-4 pb-4"
              >
                <p
                  class="text-gray-800 font-medium text-sm flex items-center"
                  v-for="honor in member.honors"
                  :key="honor.id"
                >
                  <img src="../assets/img/honor.svg" alt="goal" class="h-6 w-6 mr-3" />
                  {{ honor }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Divider -->
      <div class="mx-4 w-px bg-gray-400 h-full"></div>

      <!-- Right Side 0 - team info-->
      <div
        v-if="what_page == 0"
        class="flex flex-col w-1/2 bg-white p-5 rounded shadow-lg sm:overflow-y-scroll sm:h-[85vh]"
        style="min-width: 700px"
      >
        <div class="border-b pb-3 mb-2">
          <div class="text-xl font-bold mt-4 ml-6">
            {{ team.team_brief_info.title }}
          </div>
          <div class="text-lg font-semibold mt-5 ml-6 flex items-center">
            <img src="../assets/img/goal.svg" alt="goal" class="h-7 w-7 mr-3" />
            <span>目标：{{ team.team_brief_info.goal }}</span>
          </div>
        </div>
        <div class="px-6 max-w-[700px]">
          <span class="rich-text" v-html="team.description"></span>
        </div>
      </div>

      <!-- Right Side 1 - modify team-->
      <div
        v-else-if="what_page == 1"
        class="flex flex-col w-1/2 bg-white p-4 rounded shadow-lg sm:h-[85vh]"
        style="min-width: 700px"
      >
        <!-- 取消 -->
        <div class="flex items-center justify-end mt-1 mb-3 mr-2 pb-0 h-10">
          <div class="mb-3 mt-3 ml-0 flex">
            <!-- 取消按钮 -->
            <div
              @click="what_page = 0"
              class="flex items-center hover:cursor-pointer transition-transform transform active:scale-90"
            >
              <img src="../assets/img/cancel.svg" class="h-6 w-6 mr-2" />
              <span class="text-lg font-bold">取消</span>
            </div>
          </div>
        </div>

        <!-- 创建队伍部分 -->
        <div class="sm:overflow-y-scroll">
          <TeamCreate :initial_team_info="cur_team_info" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, reactive, watch } from 'vue'
import NavBar from '../components/NavBar.vue'
import TeamCreate from '../components/TeamCreate.vue'
import $ from 'jquery'
import {
  server_url,
  get_team_info_url,
  team_application_list_url,
  team_application_submit_url,
  team_manage_action_url
} from '../constants/constants'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const contest_id = route.params.contest_id
const team_id = route.params.team_id
const user_id = store.state.user.user_info.user_id

let what_page = ref(0) // 0 - team info, 1 - modify team
let role = ref(0) // 0 - 路人，1 - 组员， 2 - 队长

const team = reactive({
  description: '',
  members: [
    {
      user_id: 1,
      nickname: 'Yra',
      college: '信息机电与工程学院',
      avatar_url:
        'https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png',
      gender: 1,
      enrollment_year: 2021,
      honors: ['全国大学生睡觉竞赛冠军', '国际大学生摆烂竞赛冠军', '专业打游戏 8 级', '啥都不会']
    }
  ],
  team_brief_info: {
    team_id: 0,
    contest_id: 0,
    title: '',
    goal: '',
    cur_people_num: 0,
    created_time: 0,
    leader_info: {
      user_id: 0,
      nickname: '',
      college: '',
      avatar_url: '',
      gender: 0,
      enrollment_year: 0,
      honors: ['']
    }
  }
})

const formattedCreatedTime = (created_time) => {
  if (!created_time) {
    return '' // 或其他默认值
  }
  const date = new Date(created_time * 1000) // 假设 created_time 是 Unix 时间戳 (秒)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year} 年 ${month} 月 ${day} 日`
}

const get_team_info = () => {
  const team_info_url = get_team_info_url(contest_id, team_id)
  $.ajax({
    url: `${server_url}${team_info_url}`,
    type: 'GET',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    success: function (resp) {
      if (resp.status_code == 0) {
        const leader_id = resp.team_info.team_brief_info.leader_info.user_id
        if (leader_id == user_id) {
          role.value = 2
        } else {
          for (let i = 0; i < resp.team_info.members.length; i++) {
            if (resp.team_info.members[i].user_id == user_id) {
              role.value = 1
              break
            }
          }
        }
        Object.assign(team, resp.team_info)
      }
    }
  })
}
get_team_info()

const cur_team_info = reactive({
  team_id: team.team_brief_info.team_id,
  contest_id: team.team_brief_info.contest_id,
  title: team.team_brief_info.title,
  goal: team.team_brief_info.goal,
  description: team.description
})

watch(
  team,
  (newVal) => {
    cur_team_info.team_id = newVal.team_brief_info.team_id
    cur_team_info.contest_id = newVal.team_brief_info.contest_id
    ;(cur_team_info.title = newVal.team_brief_info.title),
      (cur_team_info.goal = newVal.team_brief_info.goal),
      (cur_team_info.description = newVal.description)
  },
  { immediate: true, deep: true }
)

const team_applications = ref([])
const get_team_application_list = () => {
  $.ajax({
    url: `${server_url}${team_application_list_url}`,
    type: 'GET',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data: {
      user_id: user_id,
      team_id: team_id
    },
    success: function (resp) {
      if (resp.status_code === 0) {
        const fetched_applications = resp.application_list.map((item) => {
          return {
            team_id: item.team_id,
            reason: item.reason,
            application_id: item.application_id,
            created_time: item.created_time,
            application_type: item.application_type,
            member_info: {
              user_id: item.member_info.user_id,
              nickname: item.member_info.nickname,
              college: item.member_info.college,
              avatar_url: item.member_info.avatar_url,
              gender: item.member_info.gender,
              enrollment_year: item.member_info.enrollment_year
            }
          }
        })
        team_applications.value = fetched_applications
      } else {
        console.error('Error with response:', resp.status_msg)
      }
    }
  })
}

const join_reason = ref('')

const submit_join_application = () => {
  if (!store.state.user.user_info.has_profile) {
    alert('申请入队前请先完善个人信息~')
    return
  }
  $.ajax({
    url: `${server_url}${team_application_submit_url}`,
    type: 'POST',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data: {
      team_id: team_id,
      reason: join_reason.value,
      application_type: 1,
      created_time: Math.floor(Date.now() / 1000),
      member_info: {
        user_id: user_id,
        nickname: store.state.user.nickname,
        college: store.state.user.college,
        avatar_url: store.state.user.avatar_url,
        gender: store.state.user.gender,
        enrollment_year: store.state.user.enrollment_year
      }
    },
    success: function (resp) {
      if (resp.status_code == 0) {
        console.log('Application submitted:', resp.status_msg)
        location.reload()
      } else {
        console.error('Error with response:', resp.status_msg)
      }
    },
    error: function (error) {
      console.error('Submission failed:', error)
    }
  })
}

const accept_application = (application_id) => {
  $.ajax({
    url: `${server_url}${team_manage_action_url}`,
    type: 'POST',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data: {
      user_id: user_id,
      application_id: application_id,
      action_type: 1
    },
    success: function (resp) {
      if (resp.status_code == 0) {
        console.log('Application accepted:', resp.status_msg)
        get_team_application_list()
      } else {
        console.error('Error with response:', resp.status_msg)
      }
    },
    error: function (error) {
      console.error('Action failed:', error)
    }
  })
}

const reject_application = (application_id) => {
  $.ajax({
    url: `${server_url}${team_manage_action_url}`,
    type: 'POST',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data: {
      user_id: user_id,
      application_id: application_id,
      action_type: 2
    },
    success: function (resp) {
      if (resp.status_code == 0) {
        console.log('Application rejected:', resp.status_msg)
        get_team_application_list()
      } else {
        console.error('Error with response:', resp.status_msg)
      }
    },
    error: function (error) {
      console.error('Action failed:', error)
    }
  })
}

// 取消 ESC 键关闭 dialog_apply
$(document).ready(function () {
  $('#dialog_apply').on('cancel', function (event) {
    event.preventDefault() // 阻止对话框关闭
  })
})
</script>
  
<style scoped>
</style>
    