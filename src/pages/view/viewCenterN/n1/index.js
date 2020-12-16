import React, { memo } from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';
import { N1Wrapper } from './style'

export default memo(function N1() {
  const data = [
    {id: 1, device: 'jsklaSA21', time: '2020-12-15 09:20:32', loc: '某地', centerC: '38.1', averageC: '38.0'},
    {id: 2, device: 'jsklaSA21', time: '2020-12-15 09:20:32', loc: '某地', centerC: '38.1', averageC: '38.0'},
    {id: 3, device: 'jsklaSA21', time: '2020-12-15 09:20:32', loc: '某地', centerC: '38.1', averageC: '38.0'},
    {id: 4, device: 'jsklaSA21', time: '2020-12-15 09:20:32', loc: '某地', centerC: '38.1', averageC: '38.0'},
    {id: 5, device: 'jsklaSA21', time: '2020-12-15 09:20:32', loc: '某地', centerC: '38.1', averageC: '38.0'}
  ];
  return (
    <N1Wrapper>
      <div className="title">
        <p>最新异常推送</p>
        <p>推送次数：10</p>
      </div>
      <div className="content">
        {
          data.map(item => {
            return (
              <div key={item.id} className="content_item">
                <div className="item_left">
                  <i className="iconfont icon-jingshi"></i>
                </div>
                <div className="item_right">
                  <p>设备编号为：{item.device}</p>
                  <p>于{item.time}</p>
                  <p>主动推送一条异常信息内容为：{item.loc}捕获一名中心温度为{item.centerC}℃，平均温度为{item.averageC}℃的患者</p>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className="bottom">
        <p style={{textDecoration: 'underline'}}><ArrowDownOutlined style={{fontSize: '15px', marginRight: '5px'}}/>向下滚动查看更多内容</p>
        <p>异常推送数据实时更新</p>
      </div>
    </N1Wrapper>
  )
})
