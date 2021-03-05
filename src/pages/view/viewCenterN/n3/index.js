import React, { memo, useRef, useEffect  } from 'react'
import { on, off } from '@/utils'
import { N3Wrapper } from './style'
const echarts = require('echarts');

export default memo(function N3(props) {
  const { chartData } = props; 
  const N3Ref = useRef()
  useEffect(() => {
    const myChart = echarts.init(N3Ref.current);
    let option = {
      title: {
        text: '各时间段推送频率',
        subtext: '频率分析',
        left: 'center',
        top: '3%',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}次 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '2%',
        top: '3%',
        data: ['0:00-4:00', '4:00-8:00', '8:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-24:00'],
        textStyle: {
          fontSize: 12
        }
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
      series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            center: ['60%', '60%'],
            data: [
                {value: chartData.time1, name: '0:00-4:00'},
                {value: chartData.time2, name: '4:00-8:00'},
                {value: chartData.time3, name: '8:00-12:00'},
                {value: chartData.time4, name: '12:00-16:00'},
                {value: chartData.time5, name: '16:00-20:00'},
                {value: chartData.time6, name: '20:00-24:00'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              length: 5,
              length2: 10
            }
          }
      ]
  };
    myChart.setOption(option);
    myChart.resize()
    const resize = () => {
      myChart.resize()
    }
    on(window, 'resize', resize)
    return () => {
      off(window, 'resize', resize)
    }
  },[chartData])

  return (
    <N3Wrapper ref={N3Ref}></N3Wrapper>
  )
})
