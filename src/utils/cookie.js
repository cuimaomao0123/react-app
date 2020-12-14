import Cookie from 'js-cookie';

export const cookieSetTopRouterList = (type,router) => {
  const topRouterList = cookieGetTopRouterList();
  if(type === 'add'){                                                   //新增
    if(!topRouterList.find(item => item.title === router.title)){       //cookie没有保存过某一项才进行存储
      Cookie.set('react_top_router_list', [...topRouterList, router]);
    }
  }else{                                                                //删除
    let list = topRouterList.filter(item => item.title !== router)
    Cookie.set('react_top_router_list', list);
  }
}

export const cookieGetTopRouterList = () => {
  let topRouterList = Cookie.get('react_top_router_list');
  if(topRouterList && topRouterList.length >0){
    return JSON.parse(topRouterList);
  }else {
    return [];
  }
}

export const cookieDeleteTopRouterList = (title) => {
  const topRouterList = cookieGetTopRouterList();
  let list = topRouterList.filter(item => item.title === title)
  Cookie.set('react_top_router_list', list);
}
