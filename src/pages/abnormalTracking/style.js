import styled from 'styled-components';

export const AbnormalTrackingWrapper = styled.div`
  padding: 10px 10px 0 10px;
  .search{
    margin-left: 5px;
    width: 170px;
  }
  .delete, .flag, .delete_flag{
    margin-left: 5px;
  }
  .flag_class{
    background-color: rgba(252,161,48,.1);
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