import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')
const ContestView = () => import('../views/ContestView.vue')
const UserProfileView = () => import('../views/UserProfileView.vue')
const UserProfileUploadView = () => import('../views/UserProfileUploadView.vue')

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
      path: '/user/profile',
      name: 'userprofile',
      component: UserProfileView
    },
    {
      path: '/user/profile/upload',
      name: 'userprofileupload',
      component: UserProfileUploadView
    },
    {
      path: '/contest/:contest_id/',
      name: 'contest',
      component: ContestView
    },
    {
      path: '/404/',
      name: '404',
      component: NotFoundView
    }
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/404/'
    // }
  ]
})

export default router
