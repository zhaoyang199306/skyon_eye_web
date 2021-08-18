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
export function submitTaskInfo(taskInfoNo, riskControlMeasures, radio,
                               examinValue,personalRiskLevel,checkResult,warnSignalList) {

  var pojo = {
    taskInfoNo: taskInfoNo,
    riskControlMeasures: riskControlMeasures,
    radio: radio,
    examinValue: examinValue,
    personalRiskLevel: personalRiskLevel,
    checkResult: checkResult,
    warnSignalList: warnSignalList,
  }

  console.log(pojo);

  return request({
    url: "/taskInfo/submitTask",
    method: 'post',
    data: pojo
  })
}
