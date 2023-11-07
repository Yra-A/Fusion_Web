import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')
const ContestView = () => import('../views/ContestView.vue')
const UserInfoUploadView = () => import('../views/UserInfoUploadView.vue')
const UserProfileView = () => import('../views/UserProfileView.vue')
const UserProfileUploadView = () => import('../views/UserProfileUploadView.vue')
const TeamListView = () => import('../views/TeamListView.vue')
const TeamView = () => import('../views/TeamView.vue')

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
      path: '/user/info/upload',
      name: 'userinfoupload',
      component: UserInfoUploadView
    },
    {
      path: '/user/profile/:user_id',
      name: 'userprofile',
      component: UserProfileView
    },
    {
      path: '/user/profile/upload',
      name: 'userprofileupload',
      component: UserProfileUploadView
    },
    {
      path: '/contest/:contest_id',
      name: 'contest',
      component: ContestView
    },
    {
      path: '/contest/:contest_id/team/list',
      name: 'teamlist',
      component: TeamListView
    },
    {
      path: '/contest/:contest_id/team/:team_id',
      name: 'team',
      component: TeamView
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
