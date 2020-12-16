import React, { memo } from 'react'
import { ViewCenterNWrapper } from './style'
import N1 from './n1'
import N2 from './n2'

export default memo(function ViewCnterN() {
  return (
    <ViewCenterNWrapper>
      <N1></N1>
      <N2></N2>
    </ViewCenterNWrapper>
  )
})
