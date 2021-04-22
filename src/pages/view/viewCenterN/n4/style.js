import styled from 'styled-components';

export const N4Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  height: 4rem;
  flex: 1;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
  margin-left: 0.3125rem;
  overflow: hidden;
  .title{
    height: 0.5rem;
    min-height: 30px;
    width: 100%;
    padding: 10px 15px 0 15px;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
  }
  .device_change{
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 15px 0 5px 15px;
  }
  .select{
    margin-left: 0.125rem;
    width: 2.3rem;
  }
  .device_detail{
    padding: 10px 0 5px 15px;
    display: flex;
    .device_desc{
      width: 55%;
      p{
        margin-top: 5px;
      }
    }
    .device_img{
      flex: 1;
      .zmage{
        position: absolute;
        left: 70%;
        width: 1.875rem;
        height: 1.625rem;
      }
    }
  }
  .device_bottom{
    position: absolute;
    bottom: 10px;
    left: 15px;
  }
  `