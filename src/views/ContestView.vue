<template>
  <div class="flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Content -->
    <div class="flex mx-auto mt-4 justify-center">
      <!-- Left Side - Filters -->
      <div
        class="sm:max-h-[85vh] sm:overflow-auto min-w-[500px] content-cen w-80 bg-white p-8 pt-5 rounded shadow-xl"
      >
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
            <svg aria-hidden="true" viewBox="0 0 10 10" class="ml-2 h-4 w-4">
              <path
                d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
                class="fill-indigo-300"
              ></path>
              <path
                d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
                class="fill-blue-300"
              ></path></svg
            ><span class="ml-2.5">Details</span>
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

      <!-- Right Side 0 / 1 - List-->
      <div
        v-if="whatPage == 0 || whatPage == 1"
        class="flex flex-col w-1/2 bg-white p-4 rounded shadow-lg sm:max-h-[85vh]"
        style="min-width: 700px"
      >
        <!-- 切换按钮 and 分页 -->
        <div
          class="flex items-center justify-between mt-3 mb-3 ml-1 pb-3 h-10 border-b border-b-slate-200"
        >
          <div class="flex gap-4">
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
              <span class="ml-3 block font-semibold" :class="{ 'text-gray-400': whatPage != 0 }"
                >文章列表</span
              >
            </div>
            <div v-if="contest.format == '团队竞赛'" class="flex items-center font-semibold">/</div>
            <div
              v-if="contest.format == '团队竞赛'"
              @click="change2TeamList"
              class="group flex items-center hover:cursor-pointer transition-transform transform active:scale-95"
            >
              <img
                src="../assets/img/team_list.svg"
                alt="Team List"
                class="h-8 w-8 group-hover:fill-slate-600"
                aria-hidden="true"
              />
              <span class="ml-3 block font-semibold" :class="{ 'text-gray-400': whatPage != 1 }"
                >团队列表</span
              >
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

        <!-- 文章列表 -->
        <div v-if="whatPage == 0" class="sm:overflow-auto">
          <div
            v-for="article in articles"
            :key="'link-' + article.article_id"
            class="block transition-transform transform active:scale-95"
          >
            <ArticleCard
              :title="article.title"
              :author="article.author"
              :created_time="article.created_time"
            ></ArticleCard>
          </div>
        </div>
        <!-- <TeamListView v-else-if="whatPage == 1" /> -->
      </div>
    </div>
  </div>
</template>
  
<script>
import NavBar from '../components/NavBar.vue'
import $ from 'jquery'
import { server_url, contest_info_url, article_list_url } from '../constants/constants'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'

export default {
  components: {
    NavBar,
    ArticleCard
  },
  setup() {
    const route = useRoute()
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
      created_time: 0
    })
    const whatPage = ref(0) // 0 - Article List, 1 - Team List, 2 - Article Detail, 3 - Team Detail

    const currentPage = ref(1)
    const totalPage = ref(0)
    const limit = 10 // 每页显示的数量

    const articles = ref([
      {
        article_id: 0,
        title: 'string',
        author_id: 0,
        author: 'string',
        created_time: 0
      }
    ])

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

    const getArticleList = () => {
      $.ajax({
        url: `${server_url}${article_list_url}`, // 请确保你有这个变量或者替换成适当的URL路径
        type: 'GET',
        data: {
          contest_id: contest.contest_id, // 请确保你有这个变量或者根据实际情况替换
          limit: limit,
          offset: (currentPage.value - 1) * limit
        },
        success: function (resp) {
          if (resp.status_code === 0) {
            totalPage.value = Math.ceil(resp.total / limit)
            const fetched_articles = resp.article_list.map((item) => {
              return {
                article_id: item.article_brief_info.article_id,
                title: item.article_brief_info.title,
                author_id: item.article_brief_info.author_id,
                author: item.article_brief_info.author,
                created_time: item.article_brief_info.created_time
              }
            })
            articles.value = fetched_articles
          } else {
            console.error('Error with response:', resp.status_msg)
          }
        },
        error: function (error) {
          console.error('Error fetching articles:', error)
        }
      })
    }
    getArticleList()

    const nextPage = () => {
      if (currentPage.value < totalPage.value) {
        currentPage.value += 1
        if (whatPage.value == 0) {
          getArticleList()
        }
      }
    }
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1
        if (whatPage.value == 0) {
          getArticleList()
        }
      }
    }

    const change2ArticleList = () => {
      whatPage.value = 0
      currentPage.value = 0
      totalPage.value = 0
      getArticleList()
    }

    const change2TeamList = () => {
      whatPage.value = 1
      currentPage.value = 0
      totalPage.value = 0
    }

    return {
      contest,
      whatPage,
      formattedCreatedTime,
      change2ArticleList,
      change2TeamList,
      currentPage,
      totalPage,
      articles,
      getArticleList,
      nextPage,
      prevPage
    }
  }
}
</script>
  
<style scoped>
</style>
  