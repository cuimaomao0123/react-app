import React, { memo } from 'react'

import LeftMenu from './menuWrapper';
import ContentTop from './contentTop'
import { MainWrapper, 
        TopWrapper } from './style.js'
import { renderRoutes } from 'react-router-config';

export default memo(function Main(props) {
  const { route } = props 
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

