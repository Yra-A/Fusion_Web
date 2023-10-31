import $ from 'jquery'
import jwt_decode from 'jwt-decode'
import {
  server_url,
  user_login_url,
  user_register_url,
  user_info_url,
  user_info_upload_url
} from '@/constants/constants.js'
import router from '../router'

const stored_token = localStorage.getItem('token') || ''
const stored_user_info = JSON.parse(localStorage.getItem('user_info')) || {}

const ModuleUser = {
  state: {
    token: stored_token,
    is_login: !!stored_token,
    user_info: stored_user_info
  },
  getters: {},
  mutations: {
    update_user_info(state, user) {
      localStorage.setItem('token', user.token)
      localStorage.setItem('user_info', JSON.stringify(user.user_info))
      state.token = user.token
      state.is_login = true
      state.user_info = user.user_info
    },

    // 更新本地 token
    // updateToken(state, token) {
    //   state.token = token
    // },
    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_info')
      state.token = ''
      state.is_login = false
      state.user_info = {}
    }
  },
  actions: {
    login(context, data) {
      // 登录请求
      $.ajax({
        url: `${server_url}${user_login_url}`,
        type: 'POST',
        data: {
          username: data.username,
          password: data.password
        },

        success(resp) {
          const { token } = resp
          const token_obj = jwt_decode(token)
          // 登录成功后获取用户信息
          context.dispatch('get_user_info', {
            user_id: token_obj.user_id,
            token: token,
            success: data.success
          })
        },
        error() {
          data.error()
        }
      })
    },
    get_user_info(context, data) {
      $.ajax({
        url: `${server_url}${user_info_url}`,
        type: 'GET',
        data: {
          user_id: data.user_id
        },
        headers: {
          Authorization: `Bearer ${data.token}`
        },
        success(resp) {
          if (resp.status_code == 0) {
            context.commit('update_user_info', {
              user_info: resp.user_info,
              token: data.token,
              is_login: true
            })
            data.success()
          } else if (resp.status_code == 10006) {
            // 用户信息为空
            router.push('/user/info/upload')
          }
        }
      })
    },
    register(context, data) {
      $.ajax({
        url: `${server_url}${user_register_url}`,
        type: 'POST',
        data: {
          username: data.username,
          password: data.password
        },
        success(resp) {
          if (resp.status_code != 0) {
            let msg = '注册失败，出现未知错误'
            if (resp.status_code == 10005) {
              msg = '用户名已存在'
            }
            data.error(msg)
          } else {
            context.dispatch('login', {
              username: data.username.value,
              password: data.password.value,
              success() {
                router.push({ name: 'home' })
              }
            })
          }
        },
        error() {
          console.log('error')
        }
      })
    },
    user_info_upload(context, data) {
      $.ajax({
        url: `${server_url}${user_info_upload_url}`,
        type: 'POST',
        data: {
          user_info: data.user_info
        },
        headers: {
          Authorization: `Bearer ${data.token}`
        },
        success(resp) {
          if (resp.status_code != 0) {
            let msg = '用户信息上传失败，出现未知错误'
            data.error(msg)
          } else {
            const token_obj = jwt_decode(data.token)
            context.dispatch('get_user_info', {
              user_id: token_obj.user_id,
              token: data.token,
              success: data.success
            })
          }
        },
        error() {
          console.log('error')
        }
      })
    }
  },
  modules: {}
}

export default ModuleUser
