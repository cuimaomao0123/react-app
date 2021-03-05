import styled from 'styled-components';

export const DeviceDetailWrapper = styled.div`
  padding: 10px 10px 0 10px;
  .table{
    margin-top: 10px;
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td{
      padding: 8px 2px;
      background: #ffffff;
    }
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td{
    color: #515a6e;
    padding: 8px 2px;
    font-size: 13px;
  }
  .ant-table-thead > tr > th{
    background-color: #ffffff;
  }
`