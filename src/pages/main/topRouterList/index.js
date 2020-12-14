import React, { memo, useCallback, useState, useRef, useEffect } from 'react'
import { LeftOutlined, RightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RouterItem from './routerItem'
import { on, off } from '@/utils'
import { tipCloseChangeTopRouterList } from '@/pages/main/store/actionCreators'
import { TopRouterListWrapper } from './style' 

export default memo(function TopRouterList() {
console.log('页面被重新渲染')
const [position, setposition] = useState(0)
const [selectShow, setselectShow] = useState('none');
const dispatch = useDispatch();
const centerRef = useRef();
const closeRef = useRef();
const tipRef = useRef();
const history = useHistory();
const { topRouterList } = useSelector(state => ({
  topRouterList: state.getIn(["menuData", "topRouterList"])
}), shallowEqual);
const { menuList } = useSelector(state =>({
  menuList: state.getIn(["menuData", "menuList"])
}),shallowEqual);

const changePosition = useCallback((num) => {
  // if(num <0 && position <=0){
  //   return;
  // }
  setposition(position + num);
},[position])

useEffect(() => {
  const close = closeRef.current;
  const tip = tipRef.current;
  const center = centerRef.current
  on(close, 'mouseenter', selectdisplay)
  on(tip, 'mouseleave', selecthidden)
  on(center, 'mousewheel', scroll)
  return () => {
    off(close, 'mouseenter', selectdisplay)
    off(tip, 'mouseleave', selecthidden)
    off(center, 'mousewheel', scroll)
  }
},[])
const closeTopRouterList = useCallback((type) => {
  type === 'all' && history.push(menuList[0].path)      //路由跳转到首项
  dispatch(tipCloseChangeTopRouterList(type));          //清除TopRouterList，并且清除cookie
},[dispatch, history, menuList])
const selectdisplay = () => {
  setselectShow('flex');
}
const selecthidden = () => {
  setselectShow('none');
} 
const scroll = (e) => {
  console.log(e)
  setposition(position + 100);
}
  return (
    <TopRouterListWrapper position={position} selectshow={selectShow}>
      <div className="letfMove" onClick={e => changePosition(-100)}><LeftOutlined /></div>
      <div className="center" ref={centerRef}>
        {
          topRouterList.map(item => {
            return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
          })
        }
        {
          topRouterList.map(item => {
            return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
          })
        }
        {
          topRouterList.map(item => {
            return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
          })
        }
        {
          topRouterList.map(item => {
            return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
          })
        }
        {
          topRouterList.map(item => {
            return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
          })
        }
      </div>
      <div className="rightMove" onClick={e => changePosition(100)}><RightOutlined /></div>
      <div className="closeTip" ref={tipRef}>
        <p onClick={e => closeTopRouterList('all')}>关闭所有</p>
        <p onClick={e => closeTopRouterList('others')}>关闭其他</p>
      </div>
      <div className="rightClose" ref={closeRef}><CloseCircleOutlined /></div>
    </TopRouterListWrapper>
  )
})
