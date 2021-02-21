import React, { memo, useState, useEffect } from 'react'
import { ViewCenterNWrapper } from './style'
import N1 from './n1'
import N2 from './n2'
import N3 from './n3'
import N4 from './n4'
import { getList} from '@/services/abnormalImage'

export default memo(function ViewCnterN() {
  const [list, setlist] = useState([])
  useEffect(() => {
    refresh();

    return () => {
      
    }
  }, [])
  const refresh = async (pageNum, size, siteId) => {
    const res = await getList({
      current: 1,
      size: 10,
      siteId: ""
    })
    console.log(res);
    if(res.code === 200){
      let list = [...res.data.records];
      setlist(list)
    }
  }
  return (
    <ViewCenterNWrapper>
      <N1 list={list}></N1>
      <N2 list={list}></N2>
      <N3></N3>
      <N4></N4>
    </ViewCenterNWrapper>
  )
})
