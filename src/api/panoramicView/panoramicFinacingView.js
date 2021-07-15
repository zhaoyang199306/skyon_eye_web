import request from '@/utils/request'

// 查询详细
export function getPanoramicFinacingView(custNo,custType) {
  return request({
    url: '/panoramicView/getFinacing',
    method: 'get',
    params: {
      custNo: custNo,
      custType: custType,
    }
  })
}
