import request from '@/utils/request'

// 查询所有的数据
export function listSignalManual(query) {
  return request({
    url: "/signalManual/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getSignalManualDetail(custNo) {
  return request({
    url: "/signalManual/getDetail/" + custNo,
    method: 'get'
  })
}

// 查询单个数据详细信息
export function submitSignalManualForm(data) {
  return request({
    url: "/signalManual/submitForm",
    method: 'post',
    data: data
  })
}

