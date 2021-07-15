import request from '@/utils/request'

// 查询变量分类列表
export function allEfficiencyAnalysis(date) {
  return request({
    url: '/efficiencyAnalysis/list/' + date,
    method: 'get',
  })
}
