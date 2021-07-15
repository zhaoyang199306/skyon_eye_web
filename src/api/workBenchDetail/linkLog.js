import request from '@/utils/request'

// 查询所有的数据
export function listLinkLog(taskInfoNo) {
  return request({
    url: "/linkLogs/list/" + taskInfoNo,
    method: 'get'
  })
}
// 清除流程信息的数据
export function clearWF(taskInfoNo) {
  return request({
    url: "/linkLogs/clearWF/" + taskInfoNo,
    method: 'get'
  })
}

