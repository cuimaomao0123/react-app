import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/site/select-all-paged',
    method: 'POST',
    data: config
  });
}

export const deleteSite = (config) => {
  return request({
    url: '/site/delete-by-ids',
    method: 'POST',
    data: config
  });
}
export const edit = (config) => {
  return request({
    url: '/site',
    method: 'PUT',
    data: config
  });
}
export const add = (config) => {
  return request({
    url: '/site',
    method: 'POST',
    data: config
  });
}

