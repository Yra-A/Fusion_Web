<template>
  <header>
    <div class="max-w-screen-xl pl-10 pr-2 pt-4 sm:pl-20">
      <div class="sm:flex sm:items-center sm:justify-between">
        <!-- 左边区域 -->
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome to Fusion!</h1>

          <p class="mt-1.5 text-sm text-gray-500">
            This is a university competition team platform 🎉
          </p>
        </div>

        <!-- 右边区域 -->
        <div
          class="flex flex-1 items-center justify-between gap-4 sm:justify-end lg:absolute lg:right-10"
        >
          <div class="flex items-center gap-4">
            <div class="relative">
              <label class="sr-only" for="search"> Search </label>

              <input
                class="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                id="search"
                type="search"
                placeholder="Search website..."
              />

              <button
                type="button"
                class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <span class="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            <!--通知图标-->
            <!-- <a
              href="#"
              class="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
            >
              <span class="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a> -->
          </div>

          <span aria-hidden="true" class="block h-6 w-px rounded-full bg-gray-200"></span>

          <div v-if="$store.state.user.is_login">
            <!-- 已登录状态，显示用户下拉菜单 -->
            <div class="flex-none">
              <ul class="menu menu-horizontal pl-0">
                <li>
                  <details class="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      class="group flex items-center justify-between rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <img
                        alt=""
                        src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
                        class="h-10 w-10 rounded-full object-cover"
                      />
                      <p class="ms-2 hidden text-left text-xs sm:block mr-2 mb-0">
                        <strong class="block font-medium">Yra</strong>
                        <span class="text-gray-500"> 信息机电与工程学院 </span>
                      </p>
                    </summary>
                    <!-- ... 用户下拉菜单 ... -->
                    <ul class="dropdown space-y-1 px-4 sm:w-52 right-0 sm:right-2">
                      <li>
                        <a
                          href=""
                          class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>

                          <span class="text-sm font-medium"> General </span>
                        </a>
                      </li>

                      <li>
                        <details class="group [&_summary::-webkit-details-marker]:hidden">
                          <summary
                            class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <div class="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>

                              <span class="text-sm font-medium"> Teams </span>
                            </div>
                          </summary>
                        </details>
                      </li>

                      <li>
                        <details class="group [&_summary::-webkit-details-marker]:hidden">
                          <summary
                            class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <div class="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>

                              <span class="text-sm font-medium"> Account </span>
                            </div>
                          </summary>

                          <ul class="mt-2 space-y-1 px-4">
                            <li>
                              <a
                                href=""
                                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              >
                                Details
                              </a>
                            </li>

                            <li>
                              <a
                                href=""
                                class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              >
                                Security
                              </a>
                            </li>

                            <li>
                              <form action="/logout">
                                <button
                                  type="submit"
                                  class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                >
                                  Logout
                                </button>
                              </form>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          <router-link :to="{ name: 'login' }" style="height: 72px" v-else>
            <!-- 未登录状态，显示登录按钮 -->
            <button class="btn btn-md sm:btn-lg btn-link text-black pt-6 sm:pt-2">Login</button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup() {}
}
</script>

<style scoped>
</style>
