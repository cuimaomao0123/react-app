import React, { memo } from 'react'

import LeftMenu from './menuWrapper';
import ContentTop from './contentTop'
import { MainWrapper, 
        TopWrapper } from './style.js'


export default memo(function Main(props) {
  return (
    <MainWrapper>
      <LeftMenu></LeftMenu>
      <TopWrapper>
        <ContentTop></ContentTop>
        {props.children}
      </TopWrapper>
    </MainWrapper>
  )
})
