import request from '@/network/request'

export const openDevice = (config) => {
  return request({
    url: '/picture/saveAllPicture',
    method: 'POST',
    data: config
  });
}
