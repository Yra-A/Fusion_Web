import $ from 'jquery'
import jwt_decode from 'jwt-decode'
import { server_url, user_login_url, user_info_url } from '@/constants/constants.js'

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
    update_user(state, user) {
      state.token = user.token
      state.is_login = true
      state.user_info = user
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
          localStorage.setItem('token', token)
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
          user_id: data.user_id,
          token: data.token
        },
        headers: {
          Authorization: `Bearer ${data.token}`
        },
        success(resp) {
          localStorage.setItem('user_info', JSON.stringify(resp.user_info))
          context.commit('update_user', {
            ...resp.user_info,
            token: data.token,
            is_login: true
          })
          data.success()
        }
      })
    }
  },
  modules: {}
}

export default ModuleUser
