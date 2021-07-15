import request from '@/utils/request'

// 查询详细
export function getPanoramicCreditMan(custNo,custType) {
  return request({
    url: '/panoramicView/getCredit',
    method: 'get',
    params: {
      custNo: custNo,
      custType: custType,
    }
  })
}
