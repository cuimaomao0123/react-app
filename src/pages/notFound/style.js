import styled from 'styled-components';

export const PageNotFoundWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .img{
    width: 750px;
    height: 750px;
  }
  .attention{
    font-weight: bold;
    display: flex;
    flex-direction: column;
    .title{
      position: absolute;
      left: 10%;
      top: 10%;
      transform: translate(-50%,-50%);
      font-size: 80px;
      color: rgb(52, 142, 237);
    }
    .tip{
      position: absolute;
      left: 20%;
      top: 18%;
      transform: translate(-50%,-50%);
      font-size: 20px;
    }
  }
`