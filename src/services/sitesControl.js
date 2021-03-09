import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/site/getAllSite',
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
export const getTypeId = () => {
  return request({
    url: '/site/typeList',
    method: 'GET'
  });
}
export const getDeviceId = () => {
  return request({
    url: '/facility/list',
    method: 'GET'
  });
}

