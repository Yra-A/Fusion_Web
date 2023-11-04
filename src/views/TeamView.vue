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
          <a
            href="/wuhu.html"
            class="flex justify-start hover:cursor-pointer transition-transform transform active:scale-90"
          >
            <img src="../assets/img/back.svg" class="h-6 w-6" />
            <span class="text-base">返回</span>
          </a>

          <!-- 申请加入 / 管理队伍信息 -->
          <!-- You can open the modal using ID.showModal() method -->
          <button
            v-if="role == 0"
            class="flex justify-end text-lg font-semibold text-blue-700 hover:text-blue-500 transition-transform transform active:scale-90"
            onclick="dialog_apply.showModal()"
          >
            申请加入
          </button>
          <button
            v-else-if="role == 2"
            class="flex justify-end text-lg font-semibold text-blue-700 hover:text-blue-500 transition-transform transform active:scale-90"
            onclick="dialog_manage.showModal()"
          >
            管理队伍信息
          </button>
          <dialog id="dialog_apply" class="modal modal-scroll" :close-on-press-escape="false">
            <div class="modal-box">
              <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
                  ✕
                </button>
              </form>
              <h3 class="font-bold text-lg flex items-center gap-2 mb-5">
                <img src="../assets/img/apply.svg" alt="apply" class="w-6 h-6" />申请加入队伍
              </h3>
              <form>
                <textarea
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
        </div>
        <!-- <hr class="border-t border-gray-300 my-4" /> -->
        <!-- 队长 -->
        <div class="flex flex-col mb-3 pb-1">
          <div class="pb-3 mb-1 flex">
            <img
              src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102202448804.png"
              class="rounded-full h-12 w-12 mt-2"
            />
            <div class="ml-5 flex flex-col">
              <div>
                <span class="font-semibold text-xl align-middle"> Yra </span>
                <img
                  v-if="$store.state.user.user_info.gender == 1"
                  src="../assets/img/male.svg"
                  class="inline-block ml-1 h-4 w-4 align-middle"
                />
                <img
                  v-else
                  src="../assets/img/female.svg"
                  class="inline-block ml-1 h-4 w-4 align-middle"
                />
              </div>
              <span class="text-gray-500 text-base block"> 2021 级 • 信息机电与工程学院</span>
              <span class="text-sm text-gray-400 block"> 团队创建时间 - 2023 年 11 月 2 日</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <!-- <div class="pb-3 mb-3 indent-8 text-gray-900">{{ contest.description }}</div> -->
          <h2
            class="mb-5 flex items-center text-lg font-medium leading-7 text-slate-900 pb-2 border-b"
          >
            <img src="../assets/img/pink_icon.svg" class="h-4 w-4" />
            <span class="ml-2.5 mr-3">成员列表 </span>
            <span class="flex text-center font-semibold text-lg">
              <div style="min-width: 20px">5</div>
              <div style="min-width: 20px">/</div>
              <div style="min-width: 20px">10</div>
            </span>
          </h2>
          <div class="hs-accordion-group" data-hs-accordion-always-open>
            <div class="hs-accordion shadow rounded-lg">
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <img
                    src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102202448804.png"
                    class="rounded-full h-10 w-10 mt-1"
                  />
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle"> Yra </span>
                      <img
                        v-if="$store.state.user.user_info.gender == 1"
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
                    <span class="text-xs block"> 2021 级 • 信息机电与工程学院</span>
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
                <p class="text-gray-800 dark:text-gray-200">
                  <em>This is the third item's accordion body.</em> It is hidden by default, until
                  the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions.
                </p>
              </div>
            </div>

            <div class="hs-accordion shadow rounded-lg">
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <img
                    src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102195605253.png"
                    class="rounded-full h-10 w-10 mt-1"
                  />
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle"> 夜夜想起汤的话 </span>
                      <img
                        v-if="$store.state.user.user_info.gender == 2"
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
                    <span class="text-xs block"> 2021 级 • 美术学院</span>
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
                <p class="text-gray-800 dark:text-gray-200">
                  <em>This is the third item's accordion body.</em> It is hidden by default, until
                  the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions.
                </p>
              </div>
            </div>

            <div class="hs-accordion shadow rounded-lg">
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <img
                    src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102195635637.png"
                    class="rounded-full h-10 w-10 mt-1"
                  />
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle"> burstlink </span>
                      <img
                        v-if="$store.state.user.user_info.gender == 1"
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
                    <span class="text-xs block"> 2021 级 • 马克思主义学院</span>
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
                <p class="text-gray-800 dark:text-gray-200">
                  <em>This is the third item's accordion body.</em> It is hidden by default, until
                  the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions.
                </p>
              </div>
            </div>

            <div class="hs-accordion shadow rounded-lg">
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <img
                    src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102195652298.png"
                    class="rounded-full h-10 w-10 mt-1"
                  />
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle"> RocketZhu </span>
                      <img
                        v-if="$store.state.user.user_info.gender == 1"
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
                    <span class="text-xs block"> 2021 级 • 数理学院</span>
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
                <p class="text-gray-800 dark:text-gray-200">
                  <em>This is the third item's accordion body.</em> It is hidden by default, until
                  the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions.
                </p>
              </div>
            </div>

            <div class="hs-accordion shadow rounded-lg">
              <button
                class="hs-accordion-toggle hs-accordion-active:text-blue-600 group pt-3 px-4 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 rounded"
              >
                <div class="pb-3 mb-1 flex">
                  <img
                    src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231102195712012.png"
                    class="rounded-full h-10 w-10 mt-1"
                  />
                  <div class="ml-5 flex flex-col">
                    <div>
                      <span class="font-semibold text-base align-middle"> M. Akagonio </span>
                      <img
                        v-if="$store.state.user.user_info.gender == 1"
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
                    <span class="text-xs block"> 2021 级 • 环境与地理科学学院</span>
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
                <p class="text-gray-800 dark:text-gray-200">
                  <em>This is the third item's accordion body.</em> It is hidden by default, until
                  the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Divider -->
      <div class="mx-4 w-px bg-gray-400 h-full"></div>

      <!-- Right Side -->
      <div
        class="flex flex-col w-1/2 bg-white p-5 rounded shadow-lg sm:overflow-y-scroll sm:h-[85vh]"
        style="min-width: 700px"
      >
        <div class="border-b pb-3 mb-2">
          <div class="text-xl font-bold mt-4 ml-6">
            C++ 编程手 2 名 / 论文手 2 名 / 数据分析 3 名 / 法律咨询 2 名
          </div>
          <div class="text-lg font-semibold mt-5 ml-6 flex items-center">
            <img src="../assets/img/goal.svg" alt="goal" class="h-7 w-7 mr-3" />
            <span>目标：冲击金牌</span>
          </div>
        </div>
        <div class="px-6 max-w-[700px]">
          <span class="rich-text" v-html="raw_html"></span>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import $ from 'jquery'
// import $ from 'jquery'
// import { server_url, contest_info_url, article_list_url } from '../constants/constants'
// import { ref, reactive, watch } from 'vue'

export default {
  components: {
    NavBar
  },
  setup() {
    let role = ref(0) // 0 - 路人，1 - 组员， 2 - 队长
    let raw_html = `<p>亲爱的旅行者们，</p>
<p>你们准备好迎接挑战，与我们一同征战2023年原神全球总决赛了吗？🌟 我们正在寻找5位志同道合的高手，一起走上这段传奇之旅，不仅仅是为了荣誉和胜利，更是为了那份战斗的热血和团队的默契​<span class="" data-state="closed"><a class="px-0.5 text-green-600 !no-underline" target="_blank" rel="noreferrer"><sup>1</sup></a></span>​目标】 我们的目标是组建一个具有强烈团队精神、技术高超、战术灵活的队伍，共同参加即将到来的原神全球总决赛。我们相信，通过集结各位高手的力量，我们可以在比赛中大放异彩​<span class="" data-state="closed"><a class="px-0.5 text-green-600 !no-underline" target="_blank" rel="noreferrer"><sup>2</sup></a></span>​的是】</p>
<ul>
<li>原神等级至少达到50级以上的玩家</li>
<li>拥有深厚的游戏经验，熟悉各种角色搭配与战斗机制</li>
<li>能够配合团队进行战术讨论和执行</li>
<li>有稳定的在线时间，并愿意参与团队训练和比赛</li>
<li>最重要的是，有一颗热爱原神、渴望胜利的心​<span class="" data-state="closed"><a class="px-0.5 text-green-600 !no-underline" target="_blank" rel="noreferrer"><sup>3</sup></a></span>​获得】</li>
<li>和其他高手一起游戏和成长的机会</li>
<li>一起参与国际级比赛的宝贵经验</li>
<li>实现在原神全球舞台上展示自己的梦想</li>
</ul>
<p><img src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20230131103337348.png" width="397" height="218"></p>
<p>如果你相信自己有能力，有志向，而且希望在原神全球总决赛中留下自己的足迹，请不要犹豫！立即联系我们，让我们一起开启这段旅程​<span class="" data-state="closed"><a class="px-0.5 text-green-600 !no-underline" target="_blank" rel="noreferrer"><sup>4</sup></a></span>​加入】 请通过以下方式与我联系：</p>
<ul>
<li>发送私信到我的账号</li>
<li>加入我们的Discord服务器：[服务器链接]</li>
<li>直接回复这个帖子，并留下你的联系方式和玩家信息</li>
</ul>
<p>我们将组织线上见面会，了解每位申请者的情况，并进行一系列的试玩和技能评估。时间紧迫，名额有限，我们期待着你的加入！</p>
<p>记住，每一个伟大的征程都始于一个勇敢的决定。⚔️ 让我们一起创造属于我们的传说吧​<span class="" data-state="closed"><a class="px-0.5 text-green-600 !no-underline" target="_blank" rel="noreferrer"><sup>5</sup></a></span>​日期】 申请加入的截止日期为：[具体日期]。</p>
<p>旅行者们，让我们在原神的世界里，共同谱写辉煌！🌌</p>
`

    return {
      raw_html,
      role
    }
  }
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
    