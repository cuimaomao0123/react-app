import styled from 'styled-components';

export const TopRouterListWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 0 35px;
  height: 40px;
  line-height: 40px;
  box-shadow: inset 0 0 3px 2px hsla(0, 0%, 39.2%, .1);
  .center{
    padding: 0 35px;
    position: absolute;
    left: ${props => props.position + 'px'};
    display: flex;
    align-items: center;
    transition: left .3s ease;
  }
  .letfMove{
    z-index: 10;
    display: flex;
    align-items: center;
    height: 38px;
    width: 30px;
    background-color: #ffffff;
    position: absolute;
    left: 0.5px;
    border-radius: 2px;
    .anticon{
      margin-left: 8px;
    }
    &:hover{
      cursor: pointer;
      color: #4b9cf0;
    }
  }
  .rightMove{
    z-index: 10;
    display: flex;
    align-items: center;
    height: 38px;
    width: 30px;
    background-color: #ffffff;
    position: absolute;
    right: 31px;
    border-radius: 2px;
    .anticon{
      margin-left: 8px;
    }
    &:hover{
      cursor: pointer;
      color: #4b9cf0;
    }
  }
  .rightClose{
    z-index: 10;
    display: flex;
    align-items: center;
    height: 38px;
    width: 30px;
    background-color: #ffffff;
    position: absolute;
    right: 0.5px;
    border-radius: 2px;
    .anticon{
      margin-left: 10px;
    }
    &:hover{
      cursor: pointer;
      color: #4b9cf0;
    }
  }
  .closeTip{
    position: absolute;
    top: 40px;
    right: -20px;
    transform:translateX(-30%);
    width: 70px;
    background-color: #ffffff;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    display: ${props => props.selectshow};
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
    p{
      height: 28px;
      line-height: 28px;
      width: 100%;
      text-align: center;
      color: #515a6e;
      &:hover{
        cursor: pointer;
          background-color: #f3f3f3;
      }
    }
  }
`