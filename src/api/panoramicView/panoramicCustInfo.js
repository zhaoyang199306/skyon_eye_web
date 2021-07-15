import request from '@/utils/request'

// 查询详细
export function getPanoramicCustInfo(custNo,custType) {
  return request({
    url: '/panoramicView/detail',
    method: 'get',
    params: {
      custNo: custNo,
      custType: custType,
    }
  })
}
