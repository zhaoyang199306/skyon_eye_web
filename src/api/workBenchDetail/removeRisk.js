import request from '@/utils/request'

// 查询所有的数据
export function listRemoveRisk(query) {
  return request({
    url: "/removeRisk/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getRemoveRiskDetail(taskInfoNo) {
  return request({
    url: "/removeRisk/getDetail/" + taskInfoNo,
    method: 'get'
  })
}

// 提交解除单
export function submitRemoveInfo(taskInfoNo, examineValue) {
  return request({
    url: "/removeRisk/submitRemove",
    method: 'get',
    params: {
      taskInfoNo: taskInfoNo,
      examineValue: examineValue
    }
  })
}
