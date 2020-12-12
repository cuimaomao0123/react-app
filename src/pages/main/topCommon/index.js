import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Avatar, Breadcrumb } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

import { ContentTop } from './style.js'
import { changeMenuWidth, changeCollaspe } from '../store/actionCreators'
import { removeToken, on, off } from '@/utils'

export default memo(function TopCommon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef();
  const [selectShow, setselectShow] = useState('none');
  const { breadcrumb } = useSelector(state => ({
    breadcrumb: state.getIn(["menuData", "breadcrumb"])
  }), shallowEqual);

  useEffect(() => {
    const user = userRef.current;
    on(user, 'mouseenter', selectdisplay)
    on(user, 'mouseleave', selecthidden)
    return () => {
      off(user, 'mouseenter', selectdisplay)
      off(user, 'mouseleave', selecthidden)
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
    removeToken();
    history.push("/login");
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
        <div className="select">
          <p>个人中心</p>
          <p onClick={logOut}>退出登录</p>
        </div>
      </div>
    </ContentTop>
  )
})
