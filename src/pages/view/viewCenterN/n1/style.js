import styled from 'styled-components';

export const N1Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  height: 4rem;
  width: 4.75rem;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1); 
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
  .content{
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 2.75rem; 
    overflow: auto;
    .content_item{
      padding: 8px 10px 0 10px;
      display: flex;
      justify-content: space-around;
      .item_left{
        line-height: 0.5rem;
        .icon-jingshi{
          font-size: 0.375rem;
          color: #faad14;
        }
      }
      .item_right{
        padding-left: 10px;
        p{
          &:nth-of-type(1){
            font-weight: bold;
          }
        }
      }
    }
  }
  .bottom{
    font-size: 13px;
    padding: 0.3125rem 0.125rem 0 0.125rem;
    display: flex;
    justify-content: space-between;
  }
`