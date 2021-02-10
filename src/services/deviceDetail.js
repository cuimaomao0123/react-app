import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/facility/select-all-paged',
    method: 'post',
    data: config
  });
}
export const deleteById = (config) => {
  return request({
    url: '/facility/delete-by-ids',
    method: 'post',
    data: config
  });
}
export const search = (config) => {
  return request({
    url: '/facility/select',
    method: 'post',
    data: config
  });
}