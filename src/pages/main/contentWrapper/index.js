import React, { memo } from 'react'
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { renderRoutes } from 'react-router-config';
import routes from '@/router';

import { useDispatch } from 'react-redux';
import { changeMenuWidth, changeCollaspe } from '../store/actionCreators'
import {  ContentWrapper,
          ContentTop } from './style.js'

export default memo(function RightContent(props) {
  const dispatch = useDispatch();
  let isCollapes;
  const collapseClick = () => {
    if(isCollapes){
      dispatch(changeMenuWidth(200));
      dispatch(changeCollaspe(false));
    }else{
      dispatch(changeMenuWidth(100));
      dispatch(changeCollaspe(true));
    }
    isCollapes = !isCollapes;
  };
  return (
    <ContentWrapper>
      <ContentTop>
        <Button type="defalut" icon={<MenuOutlined />} onClick={collapseClick} />
      </ContentTop>
      {renderRoutes(routes)}
    </ContentWrapper>
  )
})
