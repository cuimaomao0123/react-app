import styled from 'styled-components';

export const VirtualTableWrapper = styled.div`
 .virtual-table-cell{
   display: flex;
   align-items: center;
   justify-content: center;
   border-right: 1px solid #f0f0f0;
   border-bottom: 1px solid #f0f0f0;
   box-sizing: border-box;
 }
 .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td{
     padding: 8px 2px;
     background: #ffffff;
   }
`