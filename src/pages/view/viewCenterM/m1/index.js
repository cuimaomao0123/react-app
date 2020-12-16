import React, { memo, useRef, useEffect } from 'react'
import { on, off } from '@/utils'
import { M1Wrapper } from './style'
const echarts = require('echarts');

export default memo(function M1(props) {
  const M1Ref = useRef()
  useEffect(() => {
    let myColor = ["#1089E7", "#1089E7", "#1089E7", "#1089E7", "#1089E7", "#DC143C", "#DC143C"];
    const myChart = echarts.init(M1Ref.current);
    let option = {
      color: ['#1296db'],
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        // 是否显示刻度标签 如果是true 就显示 否则反之
        containLabel: true
      },
      toolbox: {
        right: 17,
        top: 5,
        feature: {
            saveAsImage: {
              title: '保存为图片'
            }
        }
      },
      title: {
        text: '采集样本总量(平均温度)',
        top: 10,
        left: 5,
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {},
      legend: {
        data:['总人数'],
        top: 10,
        left: '45%'
      },
      xAxis: {
        data: ["36.0~36.3","36.3~36.7","36.7~37.0","37.0~37.3","37.3~37.7","37.7~38.0","38+"],
        axisLabel: {
          rotate: 25,
        },
        axisTick: {
          alignWithLabel: true
        },
      },
      yAxis: {},
      series: [{
        name: '总人数',
        type: 'bar',
        barWidth: "45%",
        data: [200, 350, 521, 126, 150, 20, 5],
        itemStyle: {
          // 修改柱子圆角
          borderRadius : 3,
          color: function(params) {
            return myColor[params.dataIndex];
          }
        }
      }]
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
    <M1Wrapper ref={M1Ref}></M1Wrapper>
  )
})
