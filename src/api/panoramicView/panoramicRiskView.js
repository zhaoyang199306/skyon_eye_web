import request from '@/utils/request'

// 查询风险视图信息
export function getPanoramicRiskView(custNo) {
  return request({
    url: '/panoramicView/riskView/' + custNo,
    method: 'get',
  })
}
