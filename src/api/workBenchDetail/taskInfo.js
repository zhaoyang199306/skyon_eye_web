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
export function getTaskInfoDetail(taskInfoNo) {
  return request({
    url: "/taskInfo/getDetail/" + taskInfoNo,
    method: 'get'
  })
}

// 提交预警单
export function submitTaskInfo(taskInfoNo, riskValue, radio, examinValue) {
  return request({
    url: "/taskInfo/submitTask",
    method: 'get',
    params: {
      taskInfoNo: taskInfoNo,
      riskValue: riskValue,
      radio: radio,
      examinValue: examinValue,
    }
  })
}
