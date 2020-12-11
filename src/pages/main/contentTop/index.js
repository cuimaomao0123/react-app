import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { ContentTop } from './style.js'
import { changeMenuWidth, changeCollaspe } from '../store/actionCreators'
import { removeToken } from '@/utils'

export default memo(function Index() {
  const dispatch = useDispatch();
  const history = useHistory()
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
  const logOut = () => {
    removeToken();
    history.push("/login");
  }
  return (
    <ContentTop>
      <Button type="defalut" icon={<MenuOutlined />} onClick={collapseClick} />
      <Button type="defalut" onClick={logOut}>退出登录</Button>
    </ContentTop>
  )
})
