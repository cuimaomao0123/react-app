import React, { memo } from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';
import { N1Wrapper } from './style'

export default memo(function N1(props) {
 const { list } = props;
  return (
    <N1Wrapper>
      <div className="title">
        <p>最新异常推送</p>
        <p>*显示最新十条数据</p>
      </div>
      <div className="content">
        {
          list.map(item => {
            return (
              <div key={item.id} className="content_item">
                <div className="item_left">
                  <i className="iconfont icon-jingshi"></i>
                </div>
                <div className="item_right">
                  <p>设备编号为：{item.facilityName}</p>
                  <p>于{item.createTime}</p>
                  <p>主动推送一条异常信息内容为：{item.site}捕获一名最高温度为{item.max}℃，平均温度为{item.average}℃的患者</p>
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
