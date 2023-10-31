
<template>
  <NavBar />
  <section>
    <div class="min-h-screen bg-blue-50 w-full flex justify-center items-center">
      <div class="mx-auto pt-10 px-5 md:px-20 rounded-lg bg-white w-full md:w-2/3 h-4/5 shadow-2xl">
        <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block">基础信息</h1>
        <!-- Resume content -->
        <div class="grid grid-cols-2 gap-2 pt-5">
          <div>
            <p class="infotemplate pt-5">真实姓名</p>
            <p class="">郭契丹</p>
            <p class="infotemplate pt-5">入学年份</p>
            <p class="">2021</p>
            <p class="infotemplate pt-5">所属学院</p>
            <p class="">信机</p>
            <p class="infotemplate pt-5">手机号码</p>
            <p class="">15900441590</p>
          </div>

          <div class="">
            <p class="infotemplate pt-5">性别</p>
            <p class="">男</p>
            <p class="infotemplate pt-5">QQ号码</p>
            <p class="">240588498</p>
            <p class="infotemplate pt-5">微信号码</p>
            <p class="">15900441590</p>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">
            个人介绍
          </h1>
          <p class="pt-10">我是xx，拥有xx技能，希望参加xx类型比赛</p>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">
            荣誉列表
          </h1>
          <p class="pt-10">获得xx一等奖，xx二等奖</p>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">
            图片列表
          </h1>
          <div class="pt-10">img</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'UserProfileView',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.infotemplate {
  color: gray;
  font-size: 15px;
}
</style>
