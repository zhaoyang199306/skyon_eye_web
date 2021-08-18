import request from '@/utils/request'
// 查询信息
export function getPanoramicViewList(data) {
  return request({
    url: '/panoramicView/list/',
    method: 'get',
    params: data,
  })
}
