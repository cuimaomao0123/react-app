import styled from 'styled-components';

export const N2Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  height: 3.75rem;
  width: 5.125rem;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .1);
  margin-left: 0.3125rem;
  overflow: hidden;
  .title{
    height: 0.5rem;
    min-height: 30px;
    width: 100%;
    padding: 10px 0 0 15px;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 1px solid #ebeef5;
  }
  .center{
    height: 100%;
    width: 5.375rem;
    .ant-table{
      color: #515a6e;
      .ant-table-thead{
        tr{
          th{
            color: #515a6e;
            background-color: #ffffff;
            font-weight: bold;
          }
        }
      }
      .ant-table-tbody{
        td{
          padding: 0.025rem 0.1rem;
        }
      }
    }
    .bottom{
      position: absolute;
      bottom: 0.075rem;
      font-size: 13px;
      padding: 0.0375rem 0.125rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .icon-tubiaoshangshengqushi{
      color: #1ac758;
      font-weight: bold;
    }
    .zmage{
      height: 0.4rem;
      width: 0.4rem;
    }
  }
`

