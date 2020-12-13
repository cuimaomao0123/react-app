import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Avatar, Breadcrumb, message } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

import { ContentTop } from './style.js'
import { changeMenuWidth, changeCollaspe } from '../store/actionCreators'
import { removeToken, on, off } from '@/utils'
import request from '@/network/request'

export default memo(function TopCommon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef();
  const logoutRef = useRef();
  const [selectShow, setselectShow] = useState('none');
  const { breadcrumb } = useSelector(state => ({
    breadcrumb: state.getIn(["menuData", "breadcrumb"])
  }), shallowEqual);

  useEffect(() => {
    const user = userRef.current;
    const logout = logoutRef.current;
    on(user, 'mouseenter', selectdisplay)
    on(logout, 'mouseleave', selecthidden)
    return () => {
      off(user, 'mouseenter', selectdisplay)
      off(logout, 'mouseleave', selecthidden)
    }
  },[selectShow])
  let isCollapes;
  const collapseClick = () => {
    if(isCollapes){
      dispatch(changeMenuWidth(200));
      dispatch(changeCollaspe(false));
    }else{
      dispatch(changeMenuWidth(100));
      dispatch(changeCollaspe(true));
    }
    isCollapes = !isCollapes;
  };
  const selectdisplay = () => {
    setselectShow('flex');
  }
  const selecthidden = () => {
    setselectShow('none');
  }
  const logOut = () => {
    request({url:"/admin/logout", method: "post"}).then(res => {
      if(res.code ===200){
        message.success(res.msg)
        removeToken();
        history.push("/login");
      }
    })
  }
  return (
    <ContentTop selectshow={selectShow}>
      <div className="collapse">
        <Button type="defalut" icon={<MenuOutlined />} onClick={collapseClick} />
      </div>
      <div className="breadcrumb">
      <Breadcrumb>
        {
          breadcrumb.map(item => {
            return <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>;
          })
        }
      </Breadcrumb> 
      </div>
      <div className="user" ref={userRef}>
        <Avatar style={{backgroundColor: 'rgb(97, 159, 231)'}} icon={ <UserOutlined style={{color: '#ffffff'}}/>} />
        <p className="name">管理员</p>
        <div className="select" ref={logoutRef}>
          <p>个人中心</p>
          <p onClick={logOut}>退出登录</p>
        </div>
      </div>
    </ContentTop>
  )
})
