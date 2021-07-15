import request from '@/utils/request'

// 查询所有的数据
export function listManageFlow(query) {
  return request({
    url: "/manageFlow/list",
    method: 'get',
    params: query
  })
}

// 查询单个数据详细信息
export function getManageFlowDetail() {
  return request({
    url: "/manageFlow/getDetail",
    method: 'get'
  })
}
