import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/type/select-all-paged',
    method: 'POST',
    data: config
  });
}
export const search = (config) => {
  return request({
    url: '/type/select-by-example-paged',
    method: 'POST',
    data: config
  });
}
export const deleteParam = (config) => {
  return request({
    url: '/type/delete-by-ids',
    method: 'POST',
    data: config
  });
}
export const edit = (config) => {
  return request({
    url: '/type',
    method: 'PUT',
    data: config
  });
}

export const addParam = (config) => {
  return request({
    url: '/type',
    method: 'POST',
    data: config
  });
}