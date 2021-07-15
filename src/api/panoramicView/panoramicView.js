import request from '@/utils/request'
// 查询信息
export function getPanoramicViewList() {
  return request({
    url: '/panoramicView/list/',
    method: 'get'
  })
}
