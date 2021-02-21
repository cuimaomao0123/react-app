import React, { memo, useState } from 'react'
import { Row, Col, Radio } from 'antd';
import { ViewTopWrapper } from './style'

export default memo(function ViewTop(props) {
  const [radioValue, setradioValue] = useState(1)
  const onChange = e => {
    setradioValue(e.target.value);
    props.changeTime(e.target.value);
  };
  return (
    <ViewTopWrapper>
        <Row gutter={24}>
          <Col span={4}>
            <div className="top_item day">
              <Radio.Group onChange={onChange} value={radioValue}>
                <div className="radio_group1">
                  <Radio value={1}>今天</Radio>
                  <Radio value={2}>昨天</Radio>
                </div>
                <div className="radio_group2">
                  <Radio value={3}>本周</Radio>
                  <Radio value={4}>本月</Radio>
                </div>
              </Radio.Group>
            </div>
          </Col>
          <Col span={5}>
          <div className="top_item num_total">
            <i className="iconfont icon-renqun-copy"></i>
            <span className="num_total_item1">23153</span>
            <span className="num_total_item2">人</span>
            <div className="num_total_item3">
              <p> 今日共采集样本总数<span>23153</span>人</p>
            </div>
          </div>
          </Col>
          <Col span={5}>
          <div className="top_item time_total">
            <i className="iconfont icon-shijian"></i>
            <span className="time_total_item1">135</span>
            <span className="time_total_item2">h</span>
            <div className="time_total_item3">
              <p> 今日设备运营总时长<span>135</span>h</p>
            </div>
          </div>
          </Col>
          <Col span={5}>
          <div className="top_item abnormal_total">
            <i className="iconfont icon-yichangfenxi"></i>
            <span className="abnormal_total_item1">{props.chartData.ycSum}</span>
            <span className="abnormal_total_item2">人</span>
            <div className="abnormal_total_item3">
              <p>异常人员统计总数<span>{props.chartData.ycSum}</span>人</p>
            </div>
          </div>
          </Col>
          <Col span={5}>
          <div className="top_item rate">
            <i className="iconfont icon-shangsheng-copy"></i>
            <span className="rate_item1">{props.chartData.ycBj}</span>
            <span className="rate_item2">人</span>
            <div className="rate_item3">
              <p>较过去异常上升数<span>{props.chartData.ycBj}</span>人</p>
            </div>
          </div>
          </Col>
        </Row>
      </ViewTopWrapper>
  )
})
