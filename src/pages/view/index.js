import React, { memo } from 'react'

import ViewTop from './viewTop'
import ViewCenterM from './viewCenterM'
import ViewCenterN from './viewCenterN'
import { ViewWrapper, ViewWrapperCenter } from './style'

export default memo(function View(props) {
  return (
    <ViewWrapper>
      <ViewWrapperCenter>
        <ViewTop></ViewTop>
        <ViewCenterM></ViewCenterM>
        <ViewCenterN></ViewCenterN>
      </ViewWrapperCenter>
    </ViewWrapper>
  )
})
