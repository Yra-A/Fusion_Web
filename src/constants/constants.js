/* 后端接口 */
// const server_url = 'https://mock.apifox.cn/m1/3429271-0-default'
// const server_url = 'http://101.35.229.143:8888/fusion'
const server_url = 'http://localhost:8888/fusion'
const show_url = 'http://101.35.229.143:5173'

const user_login_url = '/user/login'
const user_register_url = '/user/register'
const user_info_url = '/user/info'
const user_info_upload_url = '/user/info/upload'

const contest_list_url = '/contest/list'
const contest_info_url = '/contest/info'

const article_list_url = '/article/list'

const get_team_list_url = (contest_id) => {
  return `/contest/${contest_id}/team/list`
}
const team_create_url = '/team/create'
const get_team_info_url = (contest_id, team_id) => {
  return `/contest/${contest_id}/team/info/${team_id}`
}
const team_application_list_url = '/team/manage/list'
const team_application_submit_url = '/team/application/submit'
const team_manage_action_url = '/team/manage/action'

const get_user_profile_url = (user_id) => {
  return `/user/profile/${user_id}`
}

const favorite_contest_action_url = '/favorite/contest/action'
const favorite_contest_list_url = '/favorite/contest/list'

const user_profile_upload_url = '/user/profile/upload'

const utils_upload_img_url = '/utils/upload/img'

/* 前端 */
const web_url = 'http://101.35.229.143:5173'
const web_user_profile_upload_relative_url = '/user/profile/upload' //用来给route.push重定向的相对路径
const web_contest_url = web_url + '/contest'
const web_user_profile_url = web_url + '/user/profile/{user_id}'
const web_user_profile_upload_url = web_url + web_user_profile_upload_relative_url

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
  get_team_list_url,
  user_info_upload_url,
  get_user_profile_url,
  user_profile_upload_url,
  web_user_profile_url,
  web_user_profile_upload_url,
  utils_upload_img_url,
  web_user_profile_upload_relative_url,
  team_create_url,
  get_team_info_url,
  team_application_list_url,
  team_application_submit_url,
  team_manage_action_url,
  favorite_contest_action_url,
  favorite_contest_list_url
}
