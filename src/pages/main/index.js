import React, { memo } from 'react'

import LeftMenu from './menuWrapper';
import RightContent from './contentWrapper'
import { MainWrapper } from './style.js'

export default memo(function Main() {
 
  return (
    <MainWrapper>
      <LeftMenu></LeftMenu>
      <RightContent></RightContent>
    </MainWrapper>
  )
})
