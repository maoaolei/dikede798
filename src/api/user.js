import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

/**
 *获取用户信息
 * @param {*} id 用户ID
 * @returns Promise
 */
export function getInfo(id) {
  return request({
    url: '/user-service/user/' + id
  })
}
