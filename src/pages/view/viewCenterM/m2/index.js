import React, { memo, useRef, useEffect } from 'react'
import { on, off } from '@/utils'
import { M2Wrapper } from './style'
const echarts = require('echarts');

export default memo(function M2(props) {
  const M2Ref = useRef()
  useEffect(() => {
    const myChart = echarts.init(M2Ref.current);
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: {
        left: '25%',
        right: '1%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        data: ['其他', '码头', '地铁站', '客运车站', '高铁站', '机场'],
        axisTick: {
          show: false
        },
        axisLine: {
          show :false
        }
      },
      series: [
        {
          name: '场所',
          type: 'bar',
          data: [1807, 13141, 11594, 61000, 83438, 69325],
          barWidth: "35%",
          itemStyle: {
            // 修改柱子圆角
            borderRadius : 10
          }
        }
      ]
  };
    myChart.setOption(option);
    const resize = () => {
      myChart.resize()
    }
    on(window, 'resize', resize)
    return () => {
      off(window, 'resize', resize)
    }
  },[echarts])
  return (
    <M2Wrapper ref={M2Ref}></M2Wrapper>
  )
})
 