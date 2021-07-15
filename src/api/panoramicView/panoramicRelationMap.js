import request from '@/utils/request'

// 查询详细
export function getPanoramicRelation(custNo,custType) {
  return request({
    url: '/panoramicView/getRelation',
    method: 'get',
    params: {
      custNo: custNo,
      custType: custType,
    }
  })
}
