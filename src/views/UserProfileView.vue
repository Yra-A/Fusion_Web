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
            <p class="">{{ realname }}</p>
            <p class="infotemplate pt-5">入学年份</p>
            <p class="">{{ enrolment_year }}</p>
            <p class="infotemplate pt-5">所属学院</p>
            <p class="">{{ college }}</p>
            <p class="infotemplate pt-5">手机号码</p>
            <p class="">{{ mobile_phone }}</p>
          </div>

          <div class="">
            <p class="infotemplate pt-5">性别</p>
            <p class="">{{ gender }}</p>
            <p class="infotemplate pt-5">QQ号码</p>
            <p class="">{{ qq_number }}</p>
            <p class="infotemplate pt-5">微信号码</p>
            <p class="">{{ wechat_number }}</p>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">
            个人介绍
          </h1>
          <p class="pt-10">{{ introduction }}</p>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">
            荣誉列表
          </h1>
          <p class="pt-10">{{ honors }}</p>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 border-b-2 border-gray-30 inline-block pt-10">img</h1>
          <div class="pt-10">img</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref } from 'vue'
import $ from 'jquery'
import NavBar from '../components/NavBar.vue'
import { server_url, user_profile_url } from '../constants/constants'
import { imageProps } from 'ant-design-vue/es/vc-image'
export default {
  name: 'UserProfileView',
  components: {
    NavBar
  },
  setup() {
    const realname = ref('')
    const enrolment_year = ref('')
    const college = ref('')
    const mobile_phone = ref('')
    const gender = ref('')
    const qq_number = ref('')
    const wechat_number = ref('')
    const introduction = ref('')
    const honors = ref('')
    const images = ref('')

    const fetchData = async () => {
      $.ajax({
        url: `${server_url}${user_profile_url}`, // 替换为你的 API 端点
        type: 'GET',
        success: function (resp) {
          realname.value = resp.user_profile.user_info.realname
          enrolment_year.value = resp.user_profile.user_info.enrollment_year
          college.value = resp.user_profile.user_info.college
          mobile_phone.value = resp.user_profile.user_info.mobile_phone
          gender.value = resp.user_profile.user_info.gender
          qq_number.value = resp.user_profile.qq_number
          wechat_number.value = resp.user_profile.wechat_number
          introduction.value = resp.user_profile.introduction
          honors.value = resp.user_profile.honors
          images.value = resp.user_profile.images
        },
        error: function (xhr, status, error) {
          console.error(error)
        }
      })
    }
    fetchData()

    console.log(realname.value)
    return {
      realname,
      enrolment_year,
      college,
      mobile_phone,
      gender,
      qq_number,
      wechat_number,
      introduction,
      honors,
      images,
      fetchData,
      server_url,
      user_profile_url
    }
  }
}
</script>

<style scoped>
.infotemplate {
  color: gray;
  font-size: 15px;
}
</style>
