import request from '@/utils/request'
export const userRegisterService =({username, password, repassword}) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
export const userLoginService = ({username, password}) => {
  return request.post('/api/login', {
    username,
    password
  })
}
// 获取用户信息
export const userInfoService = () => {
  return request.get('/my/userinfo')
}