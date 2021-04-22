import React, { memo, useEffect, useReducer } from 'react'
import { Select, Image } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { getSelectList, getFacility } from '@/services/n4'
import { N4Wrapper } from './style'
import reducer from './reducer'
import deviceImg from '@/assets/img/deviceImg.jpg'
const { Option } = Select;

export default memo(function N4() {
  useEffect(() => {
    getSelect();
    getFacilityData(1);
  }, [])
  const [state, dispatch] = useReducer(reducer, {
    selectArray: [],
    facility: {}
  })
  const getSelect = async() => {
    const res = await getSelectList();
    if(res.code === 200){
      dispatch({type: 'change_select_array', payload: res.data});
    }
  }
  const getFacilityData = async(id) => {
    const res = await getFacility({
      facilityId: id
    });
    if(res.code === 200){
      dispatch({type: 'change_facility', payload: res.data});
    }
  }
  const handleChange = (value) => {
    getFacilityData(value);
  }
  return (
    <N4Wrapper>
      <div className="title">
        <p>设备查询</p>
      </div>
      <div className="device_change">
        <p>设备切换</p>
        <Select className="select" 
                defaultValue="1" 
                size="small" 
                onChange={handleChange}>
          {
            state.selectArray.map(item => {
              return <Option key={item.id} value={item.id}>{item.value}</Option>;
            })
          }
        </Select>
      </div>
      <div className="device_detail">
        <div className="device_desc">
          <p>当前设备编号：{state.facility.name}</p>
          <p>设备工作地：{state.facility.site}</p>
          <p>设备发射率：{state.facility.emissivity}</p>
          <p>设备融合比：{state.facility.fusionThan}</p>
          <p>设备心跳设置：{state.facility.heartbeat}</p>
          <p>热像仪模块Ip：{state.facility.moduleIp}</p>
        </div>
        <div className="device_img">
        <Image className="zmage" 
               src={deviceImg} 
               alt="加载中..."
        />
        </div>
      </div>
      <div className="device_bottom">
        <p style={{textDecoration: 'underline'}}><MehOutlined style={{fontSize: '15px', marginRight: '5px'}}/>当前设备运行正常</p>
      </div>
    </N4Wrapper>
  )
})
