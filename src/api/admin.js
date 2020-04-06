import request from '@/utils/request'
// eslint-disable-next-line to ignore the next line.
/* eslint-disable */
// 登录
export function adminLogin (data) {
  return request({
    url: '/fwdj/user/login/admin',
    method: 'get',
    params: {
      mail: data.mail, // 1499187981@qq.com
      password: data.psd // PXHH99825
    }
  })
}
// 获取验证码
export function getCode (_email) {
  return request({
    url: '/fwdj/utils/code',
    method: 'get',
    params: {
      email: _email
    }
  })
}
// 忘记密码
export function changePsd (data) {
  return request({
    url: '/fwdj/user/password/customer',
    method: 'post',
    get: {
      mail: data.mail,
      password: data.password,
      code: data.code
    }
  })
}
// 退出账号
export function logOut () {
  return request({
    url: '/fwdj/user/logout',
    method: 'get'
  })
}
// 厨师审核
export function checkOut (data) {
  return request({
    url: '/fwdj/admin/checkstatus/alter',
    method: 'get',
    params: {
      chefid: data.chefid,
      chefstatus: data.chefstatus
    }
  })
}
// 查找某个厨师的具体信息
export function getChefInfo (data) {
  return request({
    url: '/fwdj/admin/chefdetail',
    method: 'get',
    params: {
      chefid: data
    }
  })
}
// 展示某个状态下的所有厨师
export function checkStatus (data) {
  return request({
    url: '/fwdj/admin/checkstatus',
    method: 'get',
    params: {
      checkstatus: data
    }
  })
}
// 创建菜品新类目
export function createCategory (data) {
  return request({
    url: '/fwdj/admin/category/create',
    method: 'get',
    params: {
      categoryname: data.categoryname,
      categorytype: data.categorytype
    }
  })
}
// 修改某个类目信息
export function modifyCategory (data) {
  return request({
    url: '/fwdj/admin/category/alter',
    method: 'get',
    params: {
      categoryid: data.categoryid,
      categoryname: data.categoryname,
      categorytype: data.categorytype
    }
  })
}
// 删除某个类目
export function deleteCategory (data) {
  return request({
    url: '/fwdj/admin/category/delete',
    method: 'get',
    params: {
      categoryid: data
    }
  })
}
// 获取顾客的所有订单
export function getOrderList (data) {
  return request({
    url: '/fwdj/admin/order/list',
    method: 'get',
    params: {
      page: data.page,
      size: data.size
    }
  })
}
// 获取某个订单详情
export function getOrderDetail (data) {
  return request({
    url: '/fwdj/admin/order/detail',
    method: 'get',
    params: {
      orderId: data
    }
  })
}