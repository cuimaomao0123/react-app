import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import MenuComp from '@/components/menuComp'
import { MenuWrapper} from './style.js'
import logo from '@/assets/img/logo.png'

export default memo(function LeftMenu(props) {
  const { width } = useSelector(state => ({
    width: state.getIn(["menuData", "width"])
  }), shallowEqual);
  return (
    <MenuWrapper width={width}>
      <img src={logo} className="logo" alt=""></img>
      <MenuComp {...props}/>
    </MenuWrapper>
  )
})
