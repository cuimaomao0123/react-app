import React, { memo, useRef, useEffect } from 'react'
import { on, off } from '@/utils'
import { M2Wrapper } from './style'
const echarts = require('echarts');

export default memo(function M2(props) {
  const M2Ref = useRef();
  const { chartData } = props;
  useEffect(() => {
    let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#AFEEEE", "#8B78F6"];
    const myChart = echarts.init(M2Ref.current);
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: {
        left: '2%',
        right: '10%',
        bottom: '2%',
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
          data: [chartData.site6, chartData.site5, chartData.site4, chartData.site3, chartData.site2, chartData.site1],
          barWidth: "35%",
          label: {
            show: true,
            // 图形内显示
            position: "right",
            // 文字的显示格式
            formatter: "{c}%"
          },
          itemStyle: {
            borderRadius: 10,
            color: function(params) {
              return myColor[params.dataIndex];
            }
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
    <M2Wrapper>
      <div className="left">
        <i className="iconfont icon-jiesongjifuwu"></i>
        <i className="iconfont icon-gaotiedongche"></i>
        <i className="iconfont icon-keyunzhan"></i>
        <i className="iconfont icon-ditie"></i>
        <i className="iconfont icon-gudingshunanmatou"></i>
        <i className="iconfont icon-zhandian"></i>
      </div>
      <div ref={M2Ref} className="right"></div>
    </M2Wrapper>
  )
})
 