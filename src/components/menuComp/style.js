import styled from 'styled-components';
export const MenuWrap = styled.div`
  margin-top: 80px;
  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
    border-right: none;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
    background-color: #2d8cf0;
    color: #ffffff;
  }
  .ant-menu{
    color: #C0C0C0;
    background-color: #495060;
    .ant-menu-submenu-arrow{          //箭头颜色
      color: #C0C0C0;
    }
    .ant-menu-submenu-active{         //hover时箭头颜色
      div, .ant-menu-submenu-arrow{
        color: #ffffff;
      }
    }
    .ant-menu-submenu-selected{
      color: #ffffff;
    }
    .ant-menu-item{
      margin-top: 0;
    }
    .ant-menu-submenu{
      ul{
        background-color: #363e4f;
        color: #C0C0C0;
      }
    }
    .ant-menu-inline{
      .ant-menu-item, .ant-menu-submenu-title{
        width: calc(100%);
      }
      .ant-menu-item{
        margin-bottom: 0;
      }
      .ant-menu-item::after{
        border-right: none;
      }
    } 
    .ant-menu-item-active{
      color: #ffffff;
    }
  } 
`