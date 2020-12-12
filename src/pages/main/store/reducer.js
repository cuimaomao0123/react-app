import { Map } from 'immutable';

const defaultState = Map({
  width: 200,
  isCollapse: false,
  menuList: [],
  breadcrumb: [],
  topRouterList: []
})

export const reducer = (state = defaultState, action) =>{
  switch (action.type) {
    case 'change_menu_width':
      return state.set("width", action.width);
    case 'change_collapse':
      return state.set("isCollapse", action.isCollapse);
    case 'add_menu_list':
      return state.set("menuList", action.menuList);
    case 'add_breadcrumb':
      return state.set("breadcrumb", action.breadcrumb);
    case 'change_top_router_list':
      return state.set("topRouterList", action.topRouterList);
    default:
      return state;
  }
}