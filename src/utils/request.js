import axios from 'axios'
// eslint-disable-next-line
/* eslint-disable */
// 创建 axios 实例
axios.defaults.widthCredentials = true // 让ajax请求可以携带cookie
const request = axios.create({
  // baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写
  baseURL: 'http://193.112.183.246:8888', // 单个环境下
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  }
})
// 错误处理函数
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    console.log(data)
    if (error.response.status === 400) {
      alert(data.msg)
    }
    if (error.response.status === 403) {
      alert(data.msg)
    }
    if (error.response.status === 500) {
      alert(data.msg)
    }
  }
  return Promise.reject(error)
}
// request interceptor(request拦截器)
request.interceptors.request.use(config => {
  let token = window.localStorage.getItem('accountToken')
  config.headers['token'] = token
  return config
}, err)
// response interceptor（response拦截器）
request.interceptors.response.use(response => {
  const res = response.data
  // console.log(res)
  // if (res.code !== 0&&res.code!==200) { // 后台返回数据code是从0开始一直往后顺序增加，所以这里不再判断
  //   Notify({ type: 'danger', message: res.message||res.msg });
  //   // 401:未登录;
  //   if (res.code === 401||res.code === 403||res.code===999) {
  //     Notify({ type: 'danger', message: '请登录'});
  //   }
  //   return Promise.reject('error')
  // } else {
  return res
  // }
}, err)

export default request
