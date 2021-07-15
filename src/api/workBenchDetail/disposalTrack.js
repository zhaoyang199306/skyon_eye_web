import request from '@/utils/request'

// 查询所有的数据
export function listDisposalTrack(query) {
  return request({
    url: "/disposalTrack/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getDisposalTrackDetail(taskInfoNo) {
  return request({
    url: "/disposalTrack/getDetail/" + taskInfoNo,
    method: 'get'
  })
}

// 提交跟踪单
export function submitTrackInfo(taskInfoNo, examinValue) {
  return request({
    url: "/disposalTrack/submitTrack",
    method: 'get',
    params: {
      taskInfoNo: taskInfoNo,
      examinValue: examinValue,
    }
  })
}
