import request from '@/network/request'

export const save = (config) => {
  return request({
    url: '/user/save',
    method: 'post',
    data: config
  });
}
export const edit = (config) => {
  return request({
    url: '/user',
    method: 'PUT',
    data: config
  });
}


