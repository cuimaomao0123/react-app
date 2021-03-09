import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/sample/select',
    method: 'GET',
    params: config
  });
}
export const deleteSample = (config) => {
  return request({
    url: '/sample/delete-by-ids',
    method: 'post',
    data: config
  });
}
