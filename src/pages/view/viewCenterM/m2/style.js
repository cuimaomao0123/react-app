import styled from 'styled-components';

export const M2Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  margin-left: 0.3125rem;
  height: 3.75rem;
  width: 5.125rem;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
  .left{
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 3.75rem;
    width: 1rem;
    line-height: 1.3;
    .iconfont{
      font-size: 0.375rem;
    }
    .icon-jiesongjifuwu{
      color: #8B78F6;
    }
    .icon-gaotiedongche{
      color: #AFEEEE;
    }
    .icon-keyunzhan{
      color: #F8B448;
    }
    .icon-ditie{
      color: #56D0E3;
    }
    .icon-gudingshunanmatou{
      color: #F57474;
    }
    .icon-zhandian{
      color: #1089E7;
    }
  }
  .right{
    height: 3.75rem;
    width: 4rem;
  }
  `