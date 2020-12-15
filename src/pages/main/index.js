import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';

import LeftMenu from './menuWrapper';
import TopRouterList from './topRouterList';
import TopCommon from './topCommon'
import { MainWrapper, 
        RightWrapper } from './style.js'

export default memo(function Main(props) {
  const { route } = props;
  return (
    <MainWrapper>
      <LeftMenu {...props}></LeftMenu>
      <RightWrapper>
        <TopCommon></TopCommon>
        <TopRouterList></TopRouterList>
        { renderRoutes(route.routes) }
      </RightWrapper>
    </MainWrapper>
  )
})

