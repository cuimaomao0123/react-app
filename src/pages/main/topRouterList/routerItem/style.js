import styled from 'styled-components';

export const RouterItemWWrapper = styled.div`
  .ant-tag{
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    margin-right: 6px;
    border-radius: 2px;
    border-color: #ffffff;
    background-color: #ffffff;
    .dot{
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${props => props.active ? '#2d8cf0' : '#e8eaec'};
      margin-right: 10px;
    }
    p{
      margin-right: 10px;
      color: #515a6e;
    }
  }
`