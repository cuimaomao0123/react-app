import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/sample/select',
    method: 'GET',
    params: config
  });
}
