import $ from 'jquery'
import jwt_decode from 'jwt-decode'

const ModuleUser = {
  state: {
    id: '',
    username: '',
    photo: '',
    access: '',
    is_login: false
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      ;(state.id = user.id),
        (state.username = user.username),
        (state.photo = user.photo),
        (state.access = user.access),
        (state.is_login = user.is_login)
    },

    // 更新本地 token
    updateAccess(state, access) {
      state.access = access
    },
    logout(state) {
      state.id = ''
      state.username = ''
      state.photo = ''
      state.access = ''
      state.is_login = false
    }
  },
  actions: {
    login(context, data) {
      // 登录请求
      $.ajax({
        url: '',
        type: 'POST',
        data: {
          username: data.username,
          password: data.password
        },
        success(resp) {
          const { access } = resp
          const access_obj = jwt_decode(access)

          // 登录成功后获取用户信息
          $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
            type: 'GET',
            data: {
              user_id: access_obj.user_id,
              token: /*...*/ 123
            },
            headers: {
              Authorization: `Bearer ${access}`
            },
            success(resp) {
              context.commit('updateUser', {
                ...resp,
                access: access,
                is_login: true
              })
              data.success()
            }
          })
        },

        error() {
          data.error()
        }
      })
    }
  },
  modules: {}
}

export default ModuleUser
