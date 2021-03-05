export default function reducer(state, action) {
  switch(action.type) {
    case "change_select_list":
      return {...state, selectList: action.payload}; 
    case "change_site_id":
      return {...state, siteId: action.payload}; 
    default:
      return state;
  }
}
