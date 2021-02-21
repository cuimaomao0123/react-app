import React, { memo } from 'react'
import M1 from './m1'
import M2 from './m2'
import M3 from './m3'
import { ViewCenterMWrapper } from './style'

export default memo(function ViewCenterM(props) {

  return (
    <ViewCenterMWrapper>
      <M1 {...props}></M1>
      <M2 {...props}></M2>
      <M3 {...props}></M3>
    </ViewCenterMWrapper>
  )
})