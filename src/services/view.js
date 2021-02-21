import request from '@/network/request'

export const getChartData = (config) => {
  return request({
    url: '/home/chart',
    method: 'GET',
    params: config
  });
}
