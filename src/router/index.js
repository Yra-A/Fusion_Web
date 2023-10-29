import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserProfileUploadView from '../views/UserProfileUploadView.vue'
=======
const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')
const ContestView = () => import('../views/ContestView.vue')
>>>>>>> d885ee46d4dc3e3587f876a7990febf40919e8be

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
<<<<<<< HEAD
      path: '/about',
      name: 'about'
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user/profile',
      name: 'userprofile',
      component: UserProfileView
    },
    {
      path: '/user/profile/upload',
      name: 'userprofileupload',
      component: UserProfileUploadView
=======
      path: '/contest/:contest_id/',
      name: 'contest',
      component: ContestView
    },
    {
      path: '/404/',
      name: '404',
      component: NotFoundView
>>>>>>> d885ee46d4dc3e3587f876a7990febf40919e8be
    }
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/404/'
    // }
  ]
})

export default router
