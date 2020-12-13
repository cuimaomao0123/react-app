import { dealMenuList } from '@/utils'
import { routes } from "@/router"

export const changeMenuWidth = (width) => ({
  type: 'change_menu_width',
  width
});

export const changeCollaspe = (isCollapse) => ({
  type: 'change_collapse',
  isCollapse
});

export const addBreadcrumb = (breadcrumb) => ({
  type: 'add_breadcrumb',
  breadcrumb
})

const changeTopRouterList = (topRouterList) => ({
  type: 'change_top_router_list',
  topRouterList
})
export const changeTopRouter = (router) => {            //点击侧边菜单操作逻辑
  return (dispatch, getState) => {
    const routerList = [...getState().get("menuData").get('topRouterList')];
    if(!routerList.find(item => item.title === router.title)){          //新增时，添加元素，并且修改active
      const topRouterList = [...routerList, router];
      topRouterList.forEach(item => {
        if(item.title === router.title){
          item.active = true;
        }else{
          item.active = false;
        }
      })
      dispatch(changeTopRouterList(topRouterList));
    }else{                                                            //无新增时只修改active
      routerList.forEach(item => {
        if(item.title === router.title){
          item.active = true;
        }else{
          item.active = false;
        }
      })
      dispatch(changeTopRouterList(routerList));
    }
  }
}

export const changeTopRouterVisible = (title) => {                  //点击TopListRouter跳转操作逻辑
  return (dispatch, getState) => {
    const routerList = [...getState().get("menuData").get('topRouterList')];
    const index = routerList.findIndex(item => item.title === title);
    if(routerList.length >1){                                       //判断剩余长度，只剩下一个不可以删除
      if(routerList.find(item => item.title === title).active){     //正在删除当前活跃的路由
        if(index === 0){                                            //删除第一个,，把活跃路由赋值后面一个
          routerList[index +1].active = true;
        }else{
          routerList[index -1].active = true;
        }
      }
      routerList.splice(index,1);
      dispatch(changeTopRouterList(routerList));
    }
  };
}

const addMenuList = (menuList) => ({
  type: 'add_menu_list',
  menuList
});

export const getMenuList = () => {
  return dispatch => {                        //发送请求，获取菜单栏数据
    let menuList = dealMenuList(routes);      //获取到数据后处理菜单栏数据
    dispatch(addMenuList(menuList));
  }
}

