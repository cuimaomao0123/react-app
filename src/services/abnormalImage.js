import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/picture/select',
    method: 'get',
    params: config
  });
}

export const getSelectList = () => {
  return request({
    url: '/site/list'
  });
}

export const deleteList = (config) => {
  return request({
    url: '/picture/delete-by-ids',
    method: 'POST',
    data: config
  });
}
