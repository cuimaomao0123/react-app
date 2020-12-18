import React, { memo } from 'react'
import { Select } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import Zmage from 'react-zmage'        //第三方预览图片组件
import { N4Wrapper } from './style'
const { Option } = Select;

export default memo(function N4() {
  const img = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1585758487,2031490270&fm=26&gp=0.jpg";
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  return (
    <N4Wrapper>
      <div className="title">
        <p>设备查询</p>
      </div>
      <div className="device_change">
        <p>设备切换</p>
        <Select className="select" 
                defaultValue="jack" 
                size="small" 
                onChange={handleChange}>
          <Option value="jack">SADJaJAS2</Option>
          <Option value="lucy">JJNnhads5</Option>
        </Select>
      </div>
      <div className="device_detail">
        <div className="device_desc">
          <p>当前设备编号：SADJaJAS2</p>
          <p>设备工作地：某地</p>
          <p>设备工作时长：20h</p>
        </div>
        <div className="device_img">
        <Zmage className="zmage" 
               src={img} 
               alt="加载中..."
               controller={{zoom: false, rotate: false, flip: false, pagination: false, close: false}}
        />
        </div>
      </div>
      <div className="device_bottom">
        <p style={{textDecoration: 'underline'}}><MehOutlined style={{fontSize: '15px', marginRight: '5px'}}/>当前设备运行正常</p>
      </div>
    </N4Wrapper>
  )
})
