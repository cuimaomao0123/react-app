// const devBaseURL = "http://3c0900e549.qicp.vip/";
const devBaseURL = "http://192.168.1.100:8082/";
const proBaseURL = "http://123.207.32.32:9001";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 8000;
 