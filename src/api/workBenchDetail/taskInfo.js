import request from '@/utils/request'

// 查询所有的数据
export function listTaskInfo(query) {
  return request({
    url: "/taskInfo/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getTaskDetail(taskNo) {
  return request({
    url: "/taskInfo/getTaskDetail/" + taskNo,
    method: 'get'
  })
}

// 查询客户历史预警任务信息
export function getHistoryTask(warningObjectId) {
  return request({
    url: "/taskInfo/getHistoryTask/" + warningObjectId,
    method: 'get'
  })
}

// 提交预警单
export function submitTaskInfo(seWfTaskInfo) {
  return request({
    url: "/taskInfo/submitTask",
    method: 'post',
    data: seWfTaskInfo
  })
}
