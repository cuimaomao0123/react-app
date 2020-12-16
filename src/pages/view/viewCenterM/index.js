import React, { memo } from 'react'
import M1 from './m1'
import M2 from './m2'
import M3 from './m3'
import { ViewCenterMWrapper } from './style'

export default memo(function ViewCenterM() {

  return (
    <ViewCenterMWrapper>
      <M1></M1>
      <M2></M2>
      <M3></M3>
    </ViewCenterMWrapper>
  )
})