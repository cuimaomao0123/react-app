import styled from 'styled-components';
import login_bg from '@/assets/img/login_bg.jpg';

export const LoginBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${login_bg});
  background-size: cover;
  background-position: 50%;
`
export const LoginBox = styled.div`
  padding-top: 20px;
  height: 300px;
  position: absolute;
  right: 180px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  background-color: rgb(239, 242, 244);
  border-radius: 4px;
  .title{
    width: 280px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 8px 0;
    margin: 0 auto 20px auto;
  }
  .ant-form-item-control{
    margin: 0 0 0 25px;
  }
`