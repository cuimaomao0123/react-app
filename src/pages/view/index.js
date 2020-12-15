import React, { memo } from 'react'

import ViewTop from './viewTop'
import ViewCenterM from './viewCenterM'
import { ViewWrapper } from './style'

export default memo(function View(props) {
  return (
    <ViewWrapper>
      <ViewTop></ViewTop>
      <ViewCenterM></ViewCenterM>
    </ViewWrapper>
  )
})
