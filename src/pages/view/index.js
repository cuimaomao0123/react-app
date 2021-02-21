import React, { memo, useEffect, useState } from 'react'
import ViewTop from './viewTop'
import ViewCenterM from './viewCenterM'
import ViewCenterN from './viewCenterN'
import { ViewWrapper, ViewWrapperCenter } from './style'
import { getChartData } from '@/services/view'

export default memo(function View(props) {
  const [chartData, setchartData] = useState({})
  useEffect(() => {
    getData(4);
  }, [])
  const changeTime = (time) => {
    getData(time);
  }
  const getData = async(state) => {
    const res = await getChartData({
      state: state
    });
    if(res.code === 200){
      setchartData(res.data);
    }
  }

  return (
    <ViewWrapper>
      <ViewWrapperCenter>
        <ViewTop chartData={chartData} changeTime={changeTime}></ViewTop>
        <ViewCenterM chartData={chartData}></ViewCenterM>
        <ViewCenterN chartData={chartData}></ViewCenterN>
      </ViewWrapperCenter>
    </ViewWrapper>
  )
})
