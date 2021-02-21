import styled from 'styled-components';

export const SampleInfoWrapper = styled.div`
  padding: 10px 10px 0 10px;
  .search{
    margin-left: 5px;
    width: 170px;
  }
  .ant-table-thead > tr > th, .ant-table tfoot > tr > th{
    color: #515a6e;
    padding: 8px 2px;
    font-size: 13px;
  }
  .ant-table.ant-table-bordered > .ant-table-container {
    border: 1px solid rgb(221,221,221);
  }
  .ant-table-thead > tr > th{
    background-color: #ffffff;
  }
  .ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th{
    border-right: 1px solid rgb(221,221,221);
  }
  .table{
    margin-top: 10px;
  }
`