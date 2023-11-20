<template>
  <div class="flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Content -->
    <div class="flex mx-auto mt-8 justify-center">
      <!-- Left Side - Filters -->
      <div
        class="sm:h-[85vh] sm:overflow-y-scroll min-w-[500px] flex flex-col content-cen w-80 bg-white p-4 rounded shadow shadow-xl"
        style="min-width: 300px"
      >
        <div class="block mt-3 mb-3 pb-3 h-10 border-b border-b-slate-200">
          <h3 class="text-lg font-semibold mb-4 float-left">筛选</h3>
          <span
            v-if="anyCheckboxSelected"
            @click="clearSelections"
            class="text-lg mb-4 float-right hover:cursor-pointer text-blue-500 active:text-blue-300"
          >
            清除
          </span>
          <span v-else class="text-lg text-gray-500 mb-4 float-right hover:cursor-pointer">
            清除
          </span>
        </div>

        <!--搜索框-->
        <div class="w-full max-w-xs mx-auto mt-1 mb-6">
          <div class="relative">
            <input
              v-model="keyword"
              type="text"
              class="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="搜索标题..."
            />
            <button
              @click="getContests"
              type="submit"
              class="absolute inset-y-0 right-0 px-3 flex items-center"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!--所属领域-->
        <span class="flex flex-col items-center mb-8">
          <span class="text-lg text-center font-medium block mb-2 w-full">『所属领域』</span>
          <div class="form-control w-3/4 ml-2">
            <label
              v-for="field in fields"
              :key="field.id"
              class="label cursor-pointer"
              @click="is_favor = false"
            >
              <span class="label-text text-base font-medium">{{ field.name }}</span>
              <input type="checkbox" v-model="field.selected" :class="field.styles" />
            </label>
          </div>
        </span>

        <!--参赛形式-->
        <span class="flex flex-col items-center mb-8">
          <span class="text-lg text-center font-medium block mb-2 w-full">『参赛形式』</span>
          <div class="form-control w-3/4 ml-2">
            <label
              v-for="format in competition_formats"
              :key="format.id"
              class="label cursor-pointer"
              @click="is_favor = false"
            >
              <span class="label-text text-base font-medium">{{ format.name }}</span>
              <input type="checkbox" v-model="format.selected" :class="format.styles" />
            </label>
          </div>
        </span>

        <!--收藏项-->
        <span class="flex flex-col items-center mb-8">
          <span class="text-lg text-center font-medium block mb-2 w-full">『你的收藏』</span>
          <div class="form-control w-3/4 ml-2">
            <label
              class="label hover:cursor-pointer transition-transform transform active:scale-95"
              @click="getMyFavorContest"
            >
              <span class="label-text text-base font-medium">点击查看</span>
              <img src="../assets/img/is_favor.svg" class="w-5 h-5" />
            </label>
          </div>
        </span>
      </div>

      <!-- Divider -->
      <div class="mx-4 w-px bg-gray-400 h-full"></div>

      <!-- Right Side - Event Blocks -->
      <div
        class="sm:h-[85vh] min-w-[500px] flex flex-col w-1/2 bg-white p-4 rounded shadow-lg"
        style="min-width: 700px"
      >
        <div class="block">
          <h3 v-if="!is_favor" class="float-left text-3xl ml-4 font-semibold mb-4">赛事板块 🚀</h3>
          <h3 v-else class="float-left text-3xl ml-4 font-semibold mb-4">已收藏的赛事板块 ❤️</h3>
          <!-- Pagination -->
          <div class="float-right inline-flex items-center justify-center gap-4">
            <!-- Previous Page Button -->
            <button
              @click="prevPage"
              class="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
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
              class="inline-flex h-10 w-10 items-center justify-center rounded border border-gray-400 bg-white text-gray-900 rtl:rotate-180"
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
        <div class="sm:overflow-y-scroll">
          <router-link
            :to="{ name: 'contest', params: { contest_id: contest.contest_id } }"
            v-for="contest in contests"
            :key="'link-' + contest.contest_id"
            target="_blank"
            class="block transition-transform transform active:scale-95"
          >
            <ContestCard
              :title="contest.title"
              :field="contest.field"
              :format="contest.format"
              :created_time="contest.created_time"
              :description="contest.description"
            ></ContestCard>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ContestCard from '../components/ContestCard.vue'
import { ref, computed, watch } from 'vue'
import {
  contest_list_url,
  server_url,
  web_contest_url,
  favorite_contest_list_url
} from '../constants/constants.js'
import $ from 'jquery'
import { useStore } from 'vuex'

export default {
  components: {
    NavBar,
    ContestCard
  },
  setup() {
    const keyword = ref('')
    const fields = ref([
      {
        id: 'engineering',
        name: '理工科类',
        selected: false,
        styles: 'checkbox checkbox-primary checkbox-sm'
      },
      {
        id: 'business',
        name: '商业与创新创业类',
        selected: false,
        styles: 'checkbox checkbox-sm'
      },
      {
        id: 'arts',
        name: '艺术类',
        selected: false,
        styles: 'checkbox checkbox-secondary checkbox-sm'
      },
      {
        id: 'social',
        name: '社会类',
        selected: false,
        styles: 'checkbox checkbox-accent checkbox-sm'
      },
      {
        id: 'literature',
        name: '文学类',
        selected: false,
        styles: 'checkbox checkbox-success checkbox-sm'
      },
      {
        id: 'language',
        name: '语言类',
        selected: false,
        styles: 'checkbox checkbox-warning checkbox-sm'
      },
      {
        id: 'sports',
        name: '体育类',
        selected: false,
        styles: 'checkbox checkbox-info checkbox-sm'
      },
      {
        id: 'others',
        name: '其他类',
        selected: false,
        styles: 'checkbox checkbox-error checkbox-sm'
      }
    ])
    const competition_formats = ref([
      {
        id: 'individual',
        name: '个人竞赛',
        selected: false,
        styles: 'checkbox checkbox-info checkbox-sm'
      },
      {
        id: 'team',
        name: '团队竞赛',
        selected: false,
        styles: 'checkbox checkbox-warning checkbox-sm'
      }
    ])
    const contests = ref([
      {
        contest_id: 0,
        title: '',
        field: '',
        format: '',
        created_time: 0,
        description: ''
      }
    ])
    const currentPage = ref(1)
    const totalPage = ref(0)
    const limit = 10 // 每页显示的数量
    const store = useStore()
    const is_favor = ref(false)

    // 计算属性，用于判断是否有至少一个复选框被选中
    const anyCheckboxSelected = computed(() => {
      return (
        fields.value.some((field) => field.selected) ||
        competition_formats.value.some((format) => format.selected)
      )
    })
    // 清空所有的选中状态
    const clearSelections = () => {
      fields.value.forEach((field) => (field.selected = false))
      competition_formats.value.forEach((format) => (format.selected = false))
      is_favor.value = false
    }

    // 按条件获取赛事板块
    const getContests = () => {
      if (is_favor.value == true) {
        getMyFavorContest()
        return
      }
      let selected_fields = fields.value.filter((field) => field.selected).map((field) => field.id)
      let selected_formats = competition_formats.value
        .filter((format) => format.selected)
        .map((format) => format.id)
      $.ajax({
        url: `${server_url}${contest_list_url}`,
        type: 'GET',
        data: {
          keyword: keyword.value,
          fields: selected_fields,
          formats: selected_formats,
          limit: limit,
          offset: (currentPage.value - 1) * limit
        },
        success: function (resp) {
          if (resp.status_code === 0) {
            totalPage.value = Math.ceil(resp.total / limit)
            const fetched_contests = resp.contest_list.map((item) => {
              return {
                contest_id: item.contest_brief_info.contest_id,
                title: item.contest_brief_info.title,
                field: item.contest_brief_info.field,
                format: item.contest_brief_info.format,
                created_time: item.contest_brief_info.created_time,
                description: item.contest_brief_info.description
              }
            })
            contests.value = fetched_contests
          } else {
            console.error('Error fetching contests:', resp)
          }
        },
        error: function (error) {
          console.error('Error fetching contests:', error)
        }
      })
    }

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

    getContests()

    // 监听触发
    watch(fields, getContests, { deep: true })
    watch(competition_formats, getContests, { deep: true })
    watch(currentPage, getContests)

    const getMyFavorContest = () => {
      if (store.state.user.is_login == false) {
        alert('查看收藏前请先登录~')
        return
      }
      is_favor.value = true
      $.ajax({
        url: `${server_url}${favorite_contest_list_url}`,
        type: 'GET',
        data: {
          user_id: store.state.user.user_id,
          limit: limit,
          offset: (currentPage.value - 1) * limit
        },
        headers: {
          Authorization: `Bearer ${store.state.user.token}`
        },
        success: function (resp) {
          if (resp.status_code == 0) {
            const fetched_contests = resp.contest_list.map((item) => {
              return {
                contest_id: item.contest_brief_info.contest_id,
                title: item.contest_brief_info.title,
                field: item.contest_brief_info.field,
                format: item.contest_brief_info.format,
                created_time: item.contest_brief_info.created_time,
                description: item.contest_brief_info.description
              }
            })
            contests.value = fetched_contests
          } else {
            alert(resp)
          }
        },
        error: function (error) {
          alert(error)
        }
      })
    }

    return {
      keyword,
      fields,
      contests,
      competition_formats,
      anyCheckboxSelected,
      clearSelections,
      getContests,
      currentPage,
      totalPage,
      nextPage,
      prevPage,
      web_contest_url,
      getMyFavorContest,
      is_favor
    }
  }
}
</script>

<style scoped>
</style>
