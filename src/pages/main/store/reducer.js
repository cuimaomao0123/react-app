import { Map } from 'immutable';

const defaultState = Map({
  width: 200,
  isCollapse: false,
  menuList: []
})

export const reducer = (state = defaultState, action) =>{
  switch (action.type) {
    case 'change_menu_width':
      return state.set("width", action.width);
    case 'change_collapse':
      return state.set("isCollapse", action.isCollapse);
    case 'add_menu_list':
      return state.set("menuList", action.menuList);
    default:
      return state;
  }
}