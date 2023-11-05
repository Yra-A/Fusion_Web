<template>
  <div class="card pl-4 pt-5 pb-2 pr-2 hover:shadow-md cursor-pointer transition duration-150">
    <!-- Title -->
    <h2 class="text-xl font-medium mb-2 flex">
      C++ 编程手 2名 / 论文手 2 名 / 数据分析 3 名 / 法律咨询 2 名
    </h2>

    <!-- Tags with divider -->
    <div class="flex items-center text-base text-gray-700 mb-3 mt-1">
      <span class="inline-block mr-2">目标：冲击金牌</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">队伍人数：2 / 5</span>
    </div>
    <!-- <div class="flex items-center text-base text-gray-700 mb-3 mt-1">
      <span class="inline-block mr-2">
        <img
          src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
          class="h-6 w-6 rounded-full"
        />
      </span>
      <span class="inline-block mr-2">
        <img
          src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
          class="h-6 w-6 rounded-full"
        />
      </span>
      <span class="inline-block mr-2">
        <img
          src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
          class="h-6 w-6 rounded-full"
        />
      </span>
      <span class="inline-block mr-2">
        <img
          src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
          class="h-6 w-6 rounded-full"
        />
      </span>
    </div> -->
    <!-- Creator -->
    <div class="flex items-center text-base text-gray-500 mb-3">
      <span class="inline-block mr-2">
        <img
          src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
          class="h-6 w-6 rounded-full"
        />
      </span>
      <span class="inline-block mr-2">Yra</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">2021级</span>
      <div class="inline-block mx-2 h-4 bg-gray-300 w-px"></div>
      <span class="inline-block mr-2">信息机电与工程学院</span>
    </div>
  </div>
</template>
  
<script>
export default {
  // props: {
  //   title: {
  //     type: String,
  //     default: ''
  //   },
  //   created_time: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  computed: {
    formattedCreatedTime() {
      const date = new Date(this.created_time * 1000) // 假设 created_time 是 Unix 时间戳 (秒)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // 注意：getMonth() 是从 0 开始的
      const day = date.getDate()

      return `${year} 年 ${month} 月 ${day} 日`
    }
  }
}
</script>
