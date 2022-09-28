// 对axios二次封装
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
const TimeOut = 3600
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const stamp = (currentTime - store.getters.hrsassTime) / 1000
  return stamp > TimeOut
}
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.commit('user/REMOVE_TOKEN')
      router.push('/login')
      // return Promise.reject(new Error('token失效'))
      Message.error('token失效')
    }
    config.headers.Authorization = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
// service.interceptors.response.use(response => {
//   // 1.考虑把那些数据抛出去
//   // 2.接口成功 并且业务成功
//   // 3.  没有成功Promise.reject 抛出错误
//   const { data } = response
//   console.log(data)
//   return data
//   // console.log(response)
//   // return Promise.reject(new Error())
// }, error => {
//   return Promise.reject(error)
// })
export default service
