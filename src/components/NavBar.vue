<template>
  <div class="navbar w-full flex justify-between items-center p-4">
    <!-- Left Part -->
    <router-link :to="{ name: 'home' }" class="flex items-center">
      <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]">
        <label aria-label="Open menu" for="drawer" class="btn btn-square btn-ghost drawer-button">
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </span>
      <div class="hidden sm:flex items-center gap-2">
        <a class="btn btn-ghost normal-case text-xl">
          <img
            src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231012181123493.png"
            alt=""
          />
          <span>Fusion</span>
        </a>
      </div>
    </router-link>

    <!-- Center Part - Search -->
    <div
      class="flex items-center p-2 bg-white border rounded-md mx-auto"
      style="width: 60%; max-width: 600px"
    >
      <!-- Search Icon -->
      <svg
        class="w-6 h-6 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <!-- Search Input -->
      <input
        class="flex-grow ml-2 p-1 focus:outline-none"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <!-- Clear Icon (Hidden by default) -->
      <svg
        class="w-6 h-6 text-gray-500 ml-2 cursor-pointer hidden"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>

    <!-- Right Part -->
    <div class="flex-0" v-if="$store.state.user.is_login">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://yra-typora-image.oss-cn-hangzhou.aliyuncs.com/image-20231014112932422.png"
            />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>

    <router-link
      :to="{ name: 'login' }"
      class="btn btn-ghost bg-transparent hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-gray-200 hover:border-transparent rounded-full flex-0 pl-3 mr-3 flex-none"
      v-else
    >
      <svg
        class="text-slate-900 dark:text-white w-auto h-6"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M4.5 11.5H4C4 11.7761 4.22386 12 4.5 12V11.5ZM10.5 11.5V12C10.7761 12 11 11.7761 11 11.5H10.5ZM4.5 12H10.5V11H4.5V12ZM11 11.5V9.5H10V11.5H11ZM4 9.5V11.5H5V9.5H4ZM7.5 6C5.567 6 4 7.567 4 9.5H5C5 8.11929 6.11929 7 7.5 7V6ZM11 9.5C11 7.567 9.433 6 7.5 6V7C8.88071 7 10 8.11929 10 9.5H11ZM14 11.5C14 11.7451 13.8862 12.0204 13.594 12.3165C13.2997 12.6147 12.8491 12.9061 12.2528 13.1617C11.0619 13.6721 9.3819 14 7.5 14V15C9.48409 15 11.3041 14.6563 12.6467 14.0808C13.3171 13.7935 13.8916 13.4385 14.3058 13.0189C14.722 12.5971 15 12.0833 15 11.5H14ZM7.5 14C5.6181 14 3.93808 13.6721 2.74721 13.1617C2.15089 12.9061 1.70026 12.6147 1.40597 12.3165C1.1138 12.0204 1 11.7451 1 11.5H0C0 12.0833 0.27795 12.5971 0.694221 13.0189C1.10837 13.4385 1.68286 13.7935 2.35329 14.0808C3.69593 14.6563 5.51591 15 7.5 15V14ZM1 11.5C1 11.258 1.1108 10.9868 1.39448 10.6952C1.68043 10.4012 2.11881 10.1128 2.70035 9.85849L2.29965 8.94229C1.644 9.22903 1.08238 9.58178 0.677627 9.99794C0.270611 10.4164 0 10.9245 0 11.5H1ZM12.2996 9.85849C12.8812 10.1128 13.3196 10.4012 13.6055 10.6952C13.8892 10.9868 14 11.258 14 11.5H15C15 10.9245 14.7294 10.4164 14.3224 9.99794C13.9176 9.58178 13.356 9.22903 12.7004 8.94229L12.2996 9.85849ZM7.5 4C6.67157 4 6 3.32843 6 2.5H5C5 3.88071 6.11929 5 7.5 5V4ZM9 2.5C9 3.32843 8.32843 4 7.5 4V5C8.88071 5 10 3.88071 10 2.5H9ZM7.5 1C8.32843 1 9 1.67157 9 2.5H10C10 1.11929 8.88071 0 7.5 0V1ZM7.5 0C6.11929 0 5 1.11929 5 2.5H6C6 1.67157 6.67157 1 7.5 1V0Z"
            fill="#000000"
          ></path>
        </g>
      </svg>
      <span class="text-base">登录</span>
    </router-link>
  </div>
</template>


<script>
</script>
