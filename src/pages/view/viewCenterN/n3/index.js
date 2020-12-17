import React, { memo, useRef, useEffect  } from 'react'
import { on, off } from '@/utils'
import { N3Wrapper } from './style'
const echarts = require('echarts');

export default memo(function N3() {
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
        left: '1%',
        top: '3%',
        data: ['6:00-8:00', '8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'],
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
                {value: 335, name: '6:00-8:00'},
                {value: 310, name: '8:00-10:00'},
                {value: 234, name: '10:00-12:00'},
                {value: 135, name: '12:00-14:00'},
                {value: 1548, name: '14:00-16:00'},
                {value: 158, name: '16:00-18:00'},
                {value: 1048, name: '18:00-20:00'},
                {value: 748, name: '20:00-22:00'}
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
    const resize = () => {
      myChart.resize()
    }
    on(window, 'resize', resize)
    return () => {
      off(window, 'resize', resize)
    }
  },[])

  return (
    <N3Wrapper ref={N3Ref}></N3Wrapper>
  )
})
