import request from '@/utils/request'
// 查询数据源列表
export function getSSOParams(query) {
  return request({
    url: 'ssoFerghana//source/manage',
    method: 'get',
    params: query
  })
}
