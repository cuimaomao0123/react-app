import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import RouterItem from './routerItem'
import { TopRouterListWrapper } from './style' 

export default memo(function TopRouterList() {
const { topRouterList } = useSelector(state => ({
  topRouterList: state.getIn(["menuData", "topRouterList"])
}), shallowEqual);

  return (
    <TopRouterListWrapper>
      {
        topRouterList.map(item => {
          return <RouterItem key={item.key} {...item} topRouterList={topRouterList}/>
        })
      }
    </TopRouterListWrapper>
  )
})
