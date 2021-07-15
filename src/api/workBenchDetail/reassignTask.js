import request from '@/utils/request'

// 查询所有的数据
export function listReassignTask() {
  return request({
    url: "/reassignTask/list",
    method: 'get'
  })
}

// 查询所有的数据
export function getReassignTask(id) {
  return request({
    url: "/reassignTask/getById",
    method: 'get',
    params:{
      id:id
    }
  })
}

// 查询需改派的任务
export function getReassigTaskList() {
  return request({
    url: "/reassignTask/getReassigTaskList",
    method: 'get',
  })
}

// 查询该角色下的其他人员
export function getOtherUserOnRole(role) {
  return request({
    url: "/reassignTask/getOtherUser/" + role,
    method: 'get',
  })
}

// 提交改派任务
export function submitReassignTask(data) {
  return request({
    url: "/reassignTask/submitReassignTask",
    method: 'post',
    data:data
  })
}
