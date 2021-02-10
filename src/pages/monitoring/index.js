import { Button, Spin } from 'antd'
import React, { memo, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { socketUrl } from '@/network/config'
import { MonitoringWrapper } from './style'

export default memo(function Monitoring() {
  const [state, dispatch] = useReducer(reducer, {
    url: "",
    isConnect: false,
    spin: true,
    isClick: true,
    ws: new WebSocket(socketUrl)
  })
  useEffect(() => {               
    connect();
    return () => {
      clearTimeout(spinChange);
      state.ws.close();           //组件销毁，关闭连接
    }                                   //eslint-disable-next-line
  },[])
  const spinChange = () => {
    if(!state.isConnect){
      dispatch({type: 'change_spin', payload: false});
      dispatch({type: 'change_click', payload: false});
      clearTimeout(spinChange);
    }
  }
  const connect = () => {
    const ws = state.ws
      setTimeout(spinChange, 8000);
      dispatch({type: 'change_click', payload: true});
      dispatch({type: 'change_spin', payload: true});
      ws.onopen = () => {
        console.log("socket已连接")
        dispatch({type: 'open_connect', payload: true});
        dispatch({type: 'change_spin', payload: false});
      }
      ws.onmessage = (msg) => {
        let url = msg.data;
        dispatch({type: 'get_url', payload: url});
      }
      ws.onclose = () => {
        console.log('服务端主动关闭')
        dispatch({type: 'open_connect', payload: false});
      }
  }
  return (
    <MonitoringWrapper maxPosX={50} maxPosY={50} minPosX={100} minPosY={100}>
      <div className="tip">
        <span className="title">以下为热成像设备实时输出视频流内容，可能会存在延迟...</span>
        <Button onClick={connect} disabled={state.isClick}>手动重连</Button>
      </div>
      {
        state.isConnect ? 
        <h3>设备已上线，正在持续检测视频流变化...</h3>
         : 
        <h3>*抱歉，检测到设备未上线，暂时无法获取视频内容</h3>
      }
      
      <div className="videoBox">
        <Spin size="large" tip="连接中..." spinning={state.spin}/>
        <img src={state.url} alt="资源请求中,请等待..."/>
        {/* <div className="max">max</div>
        <div className="min">min</div> */}
      </div>
    </MonitoringWrapper>
  )
})
