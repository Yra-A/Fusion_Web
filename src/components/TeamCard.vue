<template>
  <div class="card pl-4 pt-5 pb-2 pr-2 hover:shadow-md cursor-pointer transition duration-150">
    <!-- Title -->
    <h2 class="text-xl font-medium mb-2 flex">
      {{ team_brief_info.title }}
    </h2>

    <!-- Tags with divider -->
    <div class="flex items-center text-base text-gray-700 mb-3 mt-1">
      <span class="inline-block mr-2">目标：{{ team_brief_info.goal }}</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">队伍当前人数：{{ team_brief_info.cur_people_num }}</span>
    </div>

    <!-- Creator -->
    <div class="flex items-center text-base text-gray-500 mb-3">
      <span class="inline-block mr-2">
        <img
          v-if="team_brief_info.leader_info.avatar_url != ''"
          :src="team_brief_info.leader_info.avatar_url"
          class="h-6 w-6 rounded-full"
        />
        <img v-else src="../assets/img/defaultAvatar.svg" class="h-6 w-6 rounded-full" />
      </span>
      <span class="inline-block mr-2">{{ team_brief_info.leader_info.nickname }}</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">{{ team_brief_info.leader_info.enrollment_year }}级</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">{{ team_brief_info.leader_info.college }}</span>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    team_brief_info: {
      type: Object,
      default: () => ({
        team_id: null,
        title: '',
        goal: '',
        cur_people_num: 0,
        created_time: 0,
        leader_info: {
          user_id: null,
          nickname: '',
          college: '',
          avatar_url: '',
          gender: null,
          enrollment_year: 0,
          honors: []
        }
      })
    }
  },
  computed: {
    formattedCreatedTime() {
      const date = new Date(this.team_brief_info.created_time || 0) // Use default value in case created_time is not provided
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // 注意：getMonth() 是从 0 开始的
      const day = date.getDate()

      return `${year}年${month}月${day}日`
    }
  }
}
</script>
