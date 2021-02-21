import request from '@/network/request'

export const getList = (config) => {
  return request({
    url: '/user/save',
    method: 'post',
    data: config
  });
}
