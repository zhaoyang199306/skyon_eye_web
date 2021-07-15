import request from '@/utils/request'

// 查询列表任务统计
export function countQuery() {
  return request({
    url: '/workbench/count',
    method: 'get',
  })
}

// 查询预警统计排名
export function taskInfoQuery() {
  return request({
    url: "/workbench/taskInfo",
    method: 'get'
  })
}

// 查询处置跟踪分行统计
export function disposalTrackQuery() {
  return request({
    url: "/workbench/disposalTrack",
    method: 'get'
  })
}




