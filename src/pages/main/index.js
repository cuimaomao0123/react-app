import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import LeftMenu from './menuWrapper';
import ContentTop from './contentTop'
import { MainWrapper, 
        TopWrapper } from './style.js'
import { renderRoutes } from 'react-router-config';

import { getMenuList } from './store/actionCreators'

export default memo(function Main(props) {
  const { route } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuList())
  },[dispatch])
  return (
    <MainWrapper>
      <LeftMenu></LeftMenu>
      <TopWrapper>
        <ContentTop></ContentTop>
        { renderRoutes(route.routes) }
      </TopWrapper>
    </MainWrapper>
  )
})

