import React, { memo } from 'react'
import { ViewCenterNWrapper } from './style'
import N1 from './n1'
import N2 from './n2'
import N3 from './n3'
import N4 from './n4'

export default memo(function ViewCnterN() {
  return (
    <ViewCenterNWrapper>
      <N1></N1>
      <N2></N2>
      <N3></N3>
      <N4></N4>
    </ViewCenterNWrapper>
  )
})
