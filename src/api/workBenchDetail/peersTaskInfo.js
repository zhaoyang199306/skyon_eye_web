import request from '@/utils/request'

// 查询所有的数据
export function listTaskInfo(query) {
  return request({
    url: "/peersTaskInfo/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getTaskInfoDetail(taskInfoNo) {
  return request({
    url: "/peersTaskInfo/getTaskDetail/" + taskInfoNo,
    method: 'get'
  })
}

// 提交预警单
export function submitTaskInfo(taskInfoNo, riskControlMeasures, radio,
                               examinValue,personalRiskLevel,checkResult,warnSignalList,trackTime) {

  var pojo = {
    taskInfoNo: taskInfoNo,
    riskControlMeasures: riskControlMeasures,
    radio: radio,
    examinValue: examinValue,
    personalRiskLevel: personalRiskLevel,
    checkResult: checkResult,
    warnSignalList: warnSignalList,
    devolutionDate  : trackTime,
  }

  console.log(pojo);

  return request({
    url: "/peersTaskInfo/submitTask",
    method: 'post',
    data: pojo
  })
}
