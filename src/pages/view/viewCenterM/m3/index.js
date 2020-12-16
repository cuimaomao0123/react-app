import React, { memo, useRef, useEffect } from 'react'
import { on, off } from '@/utils'
import { M3Wrapper } from './style'
const echarts = require('echarts');

export default memo(function M3() {
  const M3Ref = useRef()
  useEffect(() => {
    const myChart = echarts.init(M3Ref.current);
    let option = {
      title: {
        text: '不同年龄段的异常分析',
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['男', '女'],
        textStyle: {
          color: '#4c9bfd' // 图例文字颜色
        },
        right: '15%',
        top: '3%'
      },
      grid: {
        left: '4%',
        right: '4%',
        bottom: '5%',
        show: true,// 显示边框
        containLabel: true
      },
      toolbox: {
        right: 20,
        top: 5,
        feature: {
          saveAsImage: {
            title: '保存为图片'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['5岁以下', '5-10岁', '10-20岁', '20-40岁', '40-50', '50-60', '60-70', '70岁以上'],
        axisLine: {
          show: false // 去除轴线
        },
        axisTick: {
          show: false // 去除刻度线
        }
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false  // 去除刻度
        },
      },
      series: [
        {
          name: '男',
          type: 'line',
          stack: '总量',
          data: [200, 120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '女',
          type: 'line',
          stack: '总量',
          data: [50, 220, 182, 191, 234, 290, 330, 310]
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
  },[])
  return (
    <M3Wrapper ref={M3Ref}> </M3Wrapper>
  )
})
