<template>
  <div class="card pl-4 pt-5 pb-5 pr-2 hover:shadow-md cursor-pointer transition duration-150">
    <!-- Title -->
    <h2 class="text-xl font-bold mb-2 flex">{{ title }}</h2>

    <!-- Tags with divider -->
    <div class="flex items-center text-base text-gray-500 mb-3 mt-1">
      <span class="inline-block mr-2">{{ field }}</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-1 ml-1">{{ format }}</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">发布时间：{{ formattedCreatedTime }}</span>
    </div>
    <!-- Description -->
    <p class="text-sm text-gray-400">
      {{ limitedDescription }}
    </p>
  </div>
</template>
  
  <script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: ''
    },
    created_time: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedCreatedTime() {
      const date = new Date(this.created_time * 1000) // 假设 created_time 是 Unix 时间戳 (秒)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // 注意：getMonth() 是从 0 开始的
      const day = date.getDate()

      return `${year} 年 ${month} 月 ${day} 日`
    },
    limitedDescription() {
      if (this.description.length <= 90) {
        return this.description
      } else {
        return this.description.slice(0, 90) + '...'
      }
    }
  }
}
</script>