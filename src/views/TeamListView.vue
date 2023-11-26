<template>
  <div class="flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Content -->
    <div class="flex mx-auto mt-4 justify-center">
      <!-- Left Side - Filters -->
      <div
        class="sm:h-[85vh] sm:overflow-y-scroll min-w-[500px] content-cen w-80 bg-white p-8 pt-5 rounded shadow-xl"
      >
        <div class="flex justify-between items-center">
          <!-- 返回按钮 -->
          <router-link
            :to="{ name: 'home' }"
            class="flex justify-start hover:cursor-pointer transition-transform transform active:scale-90 pt-2 mb-2"
          >
            <img src="../assets/img/back.svg" class="h-6 w-6" />
            <span class="text-base">返回</span>
          </router-link>

          <div
            class="justify-end hover:cursor-pointer transition-transform transform active:scale-90"
            @click="favor_contest"
          >
            <div
              v-if="!$store.state.user.is_login || !contest.is_favorite"
              class="flex items-center gap-1.5"
            >
              <img src="../assets/img/not_favor.svg" class="h-6 w-6" />
              <span class="text-base w-12">收藏</span>
            </div>
            <div v-else class="flex items-center gap-1.5">
              <img src="../assets/img/is_favor.svg" class="h-6 w-6" />
              <span class="text-base w-12">已收藏</span>
            </div>
          </div>
        </div>
        <!-- 新增的图片展示部分 -->
        <div
          class="mb-6 rounded overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out flex justify-center"
        >
          <img :src="contest.image_url" alt="" class="shadow-lg rounded-md w-2/5 h-auto" />
        </div>

        <!-- 赛事板块信息部分 -->
        <div>
          <!-- 竞赛标题 -->
          <div class="pb-3 mb-3 border-b border-gray-200 text-center">
            <h1 class="text-2xl font-bold mb-2">{{ contest.title }}</h1>
            <div class="flex items-center justify-center">
              <span class="inline-block text-sm text-gray-500">
                {{ contest.field }}
              </span>
              <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
              <span class="inline-block text-sm text-gray-500">
                {{ contest.format }}
              </span>
              <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
              <span class="inline-block text-sm text-gray-500">
                创建时间: {{ formattedCreatedTime(contest.created_time) }}
              </span>
            </div>
          </div>

          <div class="pb-3 mb-3 indent-8 text-gray-900">{{ contest.description }}</div>

          <h2 class="mb-5 flex items-center text-lg font-medium leading-7 text-slate-900">
            <img src="../assets/img/blue_icon.svg" class="h-4 w-4" />
            <span class="ml-2.5">Details</span>
          </h2>

          <div class="flow-root">
            <dl class="-my-3 text-sm">
              <!-- 官方网站 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="contest.contest_core_info.official_website"
              >
                <dt class="font-medium text-gray-900">官方网站</dt>
                <a
                  :href="contest.contest_core_info.official_website"
                  target="_blank"
                  class="col-span-2 link link-hover link-primary"
                >
                  {{ contest.contest_core_info.official_website }}
                </a>
              </div>

              <!-- 报名费用 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="contest.contest_core_info.fee"
              >
                <dt class="font-medium text-gray-900">报名费用</dt>
                <dd class="text-gray-700 col-span-2">
                  {{ contest.contest_core_info.fee }}
                </dd>
              </div>

              <!-- 报名截止日期 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="contest.contest_core_info.deadline"
              >
                <dt class="font-medium text-gray-900">报名截止日期</dt>
                <dd class="text-gray-700 col-span-2">
                  {{ formattedCreatedTime(contest.contest_core_info.deadline) }}
                </dd>
              </div>

              <!-- 队伍规模要求 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="
                  contest.contest_core_info.team_size.min && contest.contest_core_info.team_size.max
                "
              >
                <dt class="font-medium text-gray-900 grid items-center">队伍规模要求</dt>

                <dd class="text-gray-700 col-span-2">
                  <span class="block">
                    {{ contest.contest_core_info.team_size.min }} ~
                    {{ contest.contest_core_info.team_size.max }} 人
                  </span>
                </dd>
              </div>

              <!-- 参赛要求 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="contest.contest_core_info.participant_requirements"
              >
                <dt class="font-medium text-gray-900">参赛要求</dt>
                <dd class="text-gray-700 col-span-2">
                  {{ contest.contest_core_info.participant_requirements }}
                </dd>
              </div>

              <!-- 补充信息 -->
              <div
                class="grid py-3 grid-cols-3 gap-4 text-center"
                v-if="contest.contest_core_info.additional_info"
              >
                <dt class="font-medium text-gray-900">补充信息</dt>
                <dd class="text-gray-700 col-span-2 text-start indent-8">
                  {{ contest.contest_core_info.additional_info }}
                </dd>
              </div>

              <!-- 负责人 -->
              <div v-for="(contact, index) in contest.contest_core_info.contact" :key="index">
                <div class="grid py-3 grid-cols-3 gap-4 text-center">
                  <dt
                    class="font-medium text-gray-900 grid items-center"
                    v-if="contest.contest_core_info.contact.length > 1"
                  >
                    负责人 {{ index + 1 }}
                  </dt>
                  <dt class="font-medium text-gray-900 grid items-center" v-else>负责人</dt>
                  <dd class="text-gray-700 col-span-2">
                    {{ contact.name }}
                    <span v-if="contact.phone" class="block"> 手机号：{{ contact.phone }} </span>
                    <span v-if="contact.email" class="block"> 邮箱：{{ contact.email }} </span>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-4 w-px bg-gray-400 h-full"></div>

      <!-- Right Side 0 - team list-->
      <div
        v-if="is_create_page == 0"
        class="flex flex-col w-1/2 bg-white p-4 rounded shadow-lg sm:h-[85vh]"
        style="min-width: 700px"
      >
        <!-- 切换按钮 and 分页 -->
        <div
          class="flex items-center justify-between mt-3 mb-3 ml-1 pb-3 h-10 border-b border-b-slate-200"
        >
          <div class="flex gap-4">
            <router-link :to="{ name: 'contest', params: { contest_id: contest.contest_id } }">
              <div
                @click="change2ArticleList"
                class="group flex items-center hover:cursor-pointer transition-transform transform active:scale-95"
              >
                <img
                  src="../assets/img/article_list.svg"
                  alt="Article List"
                  class="h-8 w-8 group-hover:fill-slate-600"
                  aria-hidden="true"
                />
                <span class="ml-3 block font-semibold text-gray-400">文章列表</span>
              </div>
            </router-link>
            <div v-if="contest.format == '团队竞赛'" class="flex items-center font-semibold">/</div>
            <router-link :to="{ name: 'teamlist', params: { contest_id: contest.contest_id } }">
              <div
                v-if="contest.format == '团队竞赛'"
                class="group flex items-center hover:cursor-pointer transition-transform transform active:scale-95"
              >
                <img
                  src="../assets/img/team_list.svg"
                  alt="Team List"
                  class="h-8 w-8 group-hover:fill-slate-600"
                  aria-hidden="true"
                />
                <span class="ml-3 block font-semibold">团队列表</span>
              </div>
            </router-link>
          </div>
          <div v-if="$store.state.user.is_login" class="flex" @click="is_create_page = 1">
            <div
              class="rounded p-1 hover:border-2 border-gray-400 group flex items-center hover:cursor-pointer transition-transform transform active:scale-95"
            >
              <img
                src="../assets/img/add_circle.svg"
                class="h-6 w-6 group-hover:fill-slate-600"
                aria-hidden="true"
              />
              <span class="ml-1 block font-semibold">创建队伍</span>
            </div>
          </div>
          <!-- Pagination -->
          <div class="flex justify-end">
            <div class="inline-flex items-center justify-center gap-4">
              <!-- Previous Page Button -->
              <button
                @click="prevPage"
                class="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180 transition-transform transform active:scale-95"
              >
                <span class="sr-only">Previous Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Current Page Indicator -->
              <p class="text-xl text-gray-900 w-20 text-center">
                {{ currentPage }}
                <span class="mx-1">/</span>
                {{ totalPage }}
                <!-- Here, 12 can be a variable representing the total number of pages -->
              </p>

              <!-- Next Page Button -->
              <button
                @click="nextPage"
                class="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180 transition-transform transform active:scale-95"
              >
                <span class="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 队伍列表 -->
        <div class="sm:overflow-y-scroll">
          <router-link
            v-for="team in teams"
            :key="team.team_id"
            :to="{ name: 'team', params: { contest_id: contest_id, team_id: team.team_id } }"
          >
            <TeamCard :team_brief_info="team"></TeamCard>
          </router-link>
        </div>
      </div>

      <!-- Right Side 1 - create team-->
      <div
        v-else
        class="flex flex-col w-1/2 bg-white p-4 rounded shadow-lg sm:h-[85vh]"
        style="min-width: 700px"
      >
        <!-- 返回 -->
        <div class="flex items-center justify-between mt-1 mb-3 ml-1 pb-0 h-10">
          <div class="mb-3 mt-3 ml-0 flex justify-between">
            <!-- 返回按钮 -->
            <div
              @click="is_create_page = 0"
              class="flex items-center justify-start hover:cursor-pointer transition-transform transform active:scale-90"
            >
              <img src="../assets/img/back.svg" class="h-6 w-6" />
              <span class="text-base">返回</span>
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
import NavBar from '../components/NavBar.vue'
import $ from 'jquery'
import {
  server_url,
  contest_info_url,
  get_team_list_url,
  favorite_contest_action_url
} from '../constants/constants'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import TeamCard from '../components/TeamCard.vue'
import TeamCreate from '../components/TeamCreate.vue'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
let is_create_page = ref(0)
const contest_id = route.params.contest_id
const contest = reactive({
  contest_id: 0,
  title: '',
  image_url: '',
  field: '',
  format: '',
  description: '',
  contest_core_info: {
    deadline: 0,
    fee: '',
    contact: [
      {
        name: '',
        phone: '',
        email: ''
      }
    ],
    team_size: {
      min: 0,
      max: 0
    },
    participant_requirements: '',
    official_website: '',
    additional_info: ''
  },
  created_time: 0,
  is_favorite: false
})
const currentPage = ref(1)
const totalPage = ref(0)
const limit = 10 // 每页显示的数量

const teams = ref([])

const cur_team_info = reactive({
  team_id: 0,
  contest_id: contest_id,
  title: '',
  goal: '',
  description: ''
})

const formattedCreatedTime = (created_time) => {
  if (!created_time) {
    return '' // 或其他默认值
  }
  const date = new Date(created_time * 1000) // 假设 created_time 是 Unix 时间戳 (秒)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const paddedMinute = minute < 10 ? '0' + minute : minute

  return `${year}-${month}-${day} ${hour}:${paddedMinute}`
}

const getContestInfo = () => {
  $.ajax({
    url: `${server_url}${contest_info_url}/${contest_id}`,
    type: 'GET',
    success: function (resp) {
      console.log(resp)
      Object.assign(contest, resp.contest)
    }
  })
}
getContestInfo()

const getTeamList = () => {
  if (!store.state.user.is_login) {
    alert('请先登录，再使用团队功能')
    return
  }

  const team_list_url = get_team_list_url(contest_id)

  $.ajax({
    url: `${server_url}${team_list_url}`,
    type: 'GET',
    data: {
      limit: limit,
      offset: (currentPage.value - 1) * limit
    },
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    success: function (resp) {
      if (resp.status_code === 0) {
        totalPage.value = Math.ceil(resp.total / limit)
        const fetched_teams = resp.team_list.map((item) => {
          return {
            team_id: item.team_id,
            contest_id: item.contest_id,
            title: item.title,
            goal: item.goal,
            cur_people_num: item.cur_people_num,
            created_time: item.created_time,
            leader_info: item.leader_info // assuming you also want the leader info
          }
        })
        teams.value = fetched_teams
      } else {
        console.error('Error with response:', resp.status_msg)
      }
    },
    error: function (error) {
      console.error('Error fetching teams:', error)
    }
  })
}
getTeamList()

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
watch(currentPage, getTeamList)

const favor_contest = () => {
  if (store.state.user.is_login == false) {
    show_alert_login()
    contest.is_favorite = false
  } else {
    if (contest.is_favorite) {
      $.ajax({
        url: `${server_url}${favorite_contest_action_url}`,
        type: 'POST',
        data: JSON.stringify({
          user_id: store.state.user.user_info.user_id,
          contest_id: contest.contest_id,
          action_type: 2
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          if (resp.status_code == 0) {
            contest.is_favorite = false
          } else {
            alert(resp.status_msg)
          }
        },
        error: function (error) {
          alert(error)
        }
      })
    } else {
      $.ajax({
        url: `${server_url}${favorite_contest_action_url}`,
        type: 'POST',
        data: JSON.stringify({
          user_id: store.state.user.user_info.user_id,
          contest_id: contest.contest_id,
          action_type: 1
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          if (resp.status_code == 0) {
            contest.is_favorite = true
          } else {
            alert(resp.status_msg)
          }
        },
        error: function (error) {
          console.error('Error favoring contest:', error)
        }
      })
    }
  }
}

const show_alert_login = () => {
  alert('请先登录，再使用此功能')
}
</script>

<style scoped>
</style>
  