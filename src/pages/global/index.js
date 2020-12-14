import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getMenuList } from '@/pages/main/store/actionCreators';
import { changeTopRouterList } from '@/pages/main/store/actionCreators'
import { cookieGetTopRouterList } from '@/utils/cookie.js';

export default memo(function Global() {            //此组件用作请求全局数据（例：菜单栏等）,无展示作用
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuList())                                       //请求菜单栏
    if(cookieGetTopRouterList().length >0){
      dispatch(changeTopRouterList(cookieGetTopRouterList()))     //请求TopRouterList数据
    }
  },[dispatch])

  return <></> ;
})
