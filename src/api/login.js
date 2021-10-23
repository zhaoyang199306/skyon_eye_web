import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    params: data
  })
}

// 单点登录方法
export function ssologin(userAccount,loginToken) {
  const data = {
    userAccount,
    loginToken,
  }
  return request({
    url: '/sso/login',
    method: 'post',
    params: data
  })
}
// 从一期session登录方法
export function sessionlogin(callback) {
  const data = {
    callback
  }
  return request({
    url: '/session/login',
    method: 'get',
    params: data
  })
}
// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
