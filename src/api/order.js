import request from '@/utils/request'
// 工单统计
export function getOrderInfo(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}
// 销售统计的订单量12345
export function getSaleCount(start, end) {
  return request({
    url: '/order-service/report/orderCount',
    params: {
      start,
      end
    }
  })
}

// 销售统计中的销售额 8.35万元
export function getSaleMoney(start, end) {
  return request({
    url: '/order-service/report/orderAmount',
    params: {
      start,
      end
    }
  })
}

// 获取商品热榜 前10
export function getHotGoods(topValue, start, end) {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}

// 合作商点位数 top5
export function getPartners() {
  return request({
    url: '/vm-service/node/nodeCollect'
  })
}

// 获取合作商总数 5
export function getAllPartners() {
  return request({
    url: '/user-service/partner/count'
  })
}

// 获取点位总数 16
export function getAllPonit() {
  return request({
    url: '/vm-service/node/count'
  })
}

// 销售数据折线图
export const getSalesData = (collectType, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

// 销售额分布柱状图
export const getSalesSpread = (start, end) => {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

// 合作商搜索 饼状图点进去
export const getComdetail = (pageIndex, pageSize) => {
  return request({
    url: '/user-service/partner/search',
    params: {
      pageIndex,
      pageSize
    }
  })
}
