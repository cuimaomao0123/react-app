import styled from 'styled-components';

export const ContentTop = styled.div`
  display: flex;
  align-items: center;
  z-index: 20;
  position: relative;
  height: 60px;
  width: 100%;
  background-color: #ffffff;
  .collapse{
    position: absolute;
    left: 25px;
    top: 50%;
    transform:translateY(-50%);
    button{
      border: none;
    }
  }
  .breadcrumb{
    margin-left: 80px;
  }
  .user{
    position: absolute;
    right: 40px;
    top: 50%;
    transform:translateY(-50%);
    &:hover{
      cursor: pointer;
    }
    .name{
      color: rgb(97, 159, 231);
      margin-top: 3px;
    }
    .select{
      display: ${props => props.selectshow};
      position: absolute;
      top: 55px;
      transform:translateX(-30%);
      width: 80px;
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid #eee;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 5px 0px;
      p{
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 5px auto;
        text-align: center;
        color: #515a6e;
        &:hover{
          cursor: pointer;
          background-color: #f3f3f3;
        }
      }
    }
  }
`
