import { dealMenuList } from '@/utils'

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
  return dispatch => {
    dealMenuList()
    // dispatch(changeHotRecommendAction(res));
  }
}
