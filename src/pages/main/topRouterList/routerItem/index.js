import React, { memo } from 'react'
import { Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { changeTopRouterVisible } from '@/pages/main/store/actionCreators'
import { RouterItemWWrapper } from './style' 

export default memo(function RouterItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const closeTag = (title) => {
    dispatch(changeTopRouterVisible(title));
    const index = props.topRouterList.findIndex(item => item.title === title);
    if(props.topRouterList.length >=2 && props.topRouterList[index].active){                      //路由处于活跃状态下删除才会跳转路由
      if(index === 0){
        history.push(props.topRouterList[index +1].path);
      }else{
        history.push(props.topRouterList[index -1].path);
      } 
    }
  }
  return (
    <RouterItemWWrapper active={props.active}>
      <Tag closable onClose={e => closeTag(props.title)} onClick={e => history.push(props.path)}>
        <div className="dot"></div>
        <p>{props.title}</p>
      </Tag>
    </RouterItemWWrapper>
  )
})
