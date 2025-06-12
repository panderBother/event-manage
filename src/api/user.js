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

// 修改用户密码
export const userUpdatePasswordService = (data) => {
  return request.patch('/my/updatepwd', data)
}
// 修改用户信息
export const userUpdateService = (data) => {
  return request.put('/my/userinfo', data)
}
// 修改用户头像 
export const userUploadAvatarService = (avatar) => request.patch('/my/update/avatar', { avatar })