import request from '@/network/request'

export const getSelectList = (config) => {
  return request({
    url: '/facility/list',
    method: 'GET',
    params: config
  });
}

export const getFacility = (config) => {
  return request({
    url: '/home/fac_att',
    method: 'GET',
    params: config
  });
}
