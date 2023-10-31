/* 后端接口 */
const server_url = 'https://mock.apifox.cn/m1/3429271-0-default'
const show_url = 'http://localhost:5173'

const user_login_url = '/user/login'
const user_register_url = '/user/register'
const user_info_url = '/user/info'
const user_info_upload_url = '/user/info/upload'

const contest_list_url = '/contest/list'
const contest_info_url = '/contest/info'

const article_list_url = '/article/list'

const team_list_url = '/team/list'

const user_profile_url = '/user/profile/{user_id}'
const user_profile_upload_url = '/user/profile/upload'

/* 前端 */
const web_url = 'http://localhost:5173'
const web_contest_url = web_url + '/contest'

export {
  server_url,
  show_url,
  user_info_url,
  user_login_url,
  user_register_url,
  contest_list_url,
  contest_info_url,
  web_url,
  web_contest_url,
  article_list_url,
  team_list_url,
  user_info_upload_url,
  user_profile_url,
  user_profile_upload_url
}
