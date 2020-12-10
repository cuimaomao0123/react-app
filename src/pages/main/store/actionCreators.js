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

