import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { getMenuList } from '@/pages/main/store/actionCreators'

export default memo(function Global() {            //此组件用作请求全局数据（例：菜单栏等）,无展示作用
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenuList())                        //请求菜单栏
  },[dispatch])

  return <></> ;
})
