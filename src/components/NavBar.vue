<template>
  <header class="w-full h-24 bg-white bg-opacity">
    <div class="w-full pb-2 pl-10 pr-2 pt-4 sm:pl-20 shadow fixed top-0 z-50 bg-white">
      <div class="flex items-center justify-between">
        <!-- 左边区域 -->
        <div class="text-center sm:text-left">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome to Fusion!</h1>

          <p class="mt-1.5 text-sm text-gray-500">
            This is a university competition team platform 🎉
          </p>
        </div>

        <!-- 右边区域 -->
        <div class="flex gap-4 justify-center sm:justify-end">
          <div v-if="$store.state.user.is_login">
            <!-- 已登录状态，显示用户下拉菜单 -->
            <div class="flex-none">
              <ul class="menu menu-horizontal pl-10">
                <li>
                  <details class="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      class="group flex items-center justify-between rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <img
                        alt=""
                        :src="$store.state.user.user_info.avatar_url"
                        class="h-10 w-10 rounded-full object-cover"
                      />
                      <p class="ms-2 text-left text-xs block mr-2 mb-0">
                        <span class="block font-medium text-base">
                          <span class="align-middle">{{
                            $store.state.user.user_info.nickname
                          }}</span>

                          <!-- 当 gender 为 1 时，仅显示male图标 -->
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
                        </span>
                        <span class="text-gray-600 text-xs">
                          {{ $store.state.user.user_info.college }}
                        </span>
                      </p>
                    </summary>
                    <!-- ... 用户下拉菜单 ... -->
                    <ul class="dropdown space-y-1 px-4 sm:w-52 right-0 sm:right-2">
                      <li>
                        <a
                          href=""
                          class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
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
                        <a
                          :href="web_user_profile_url"
                          class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            class="h-5 w-5 opacity-75"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="gray"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                            />
                          </svg>

                          <span class="text-sm font-medium"> Profile </span>
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
                          </ul>
                        </details>
                      </li>

                      <li>
                        <div
                          @click="logout"
                          class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
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

                          <span class="text-sm font-medium"> Logout </span>
                        </div>
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
import { useStore } from 'vuex'
import { web_user_profile_url } from '../constants/constants'
export default {
  setup() {
    const store = useStore()
    const logout = () => {
      store.commit('logout')
    }
    return {
      logout,
      web_user_profile_url
    }
  }
}
</script>

<style scoped>
</style>
