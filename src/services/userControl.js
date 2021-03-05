import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/admin/select-all-paged',
    method: 'POST',
    data: config
  });
}
export const deleteSite = (config) => {
  return request({
    url: '/admin/delete-by-ids',
    method: 'POST',
    data: config
  });
}

export const addUser = (config) => {
  return request({
    url: '/admin/register',
    method: 'POST',
    data: config
  });
}

export const forbiddenUser = (config) => {
  return request({
    url: '/admin/setForbidden',
    method: 'POST',
    data: config
  });
}
export const edit = (config) => {
  return request({
    url: '/admin/update',
    method: 'POST',
    data: config
  });
}
