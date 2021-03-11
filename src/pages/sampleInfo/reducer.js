export default function reducer(state, action) {
  switch(action.type) {
    case "change_is_select_all":
      return {...state, isSelectAll: action.payload};
    case "change_indeterminate":
      return {...state, indeterminate: action.payload};
    case "change_select_list":
      return {...state, selectList: action.payload};
    case "change_site_id":
      return {...state, siteId: action.payload};
    case "change_selected_array":
      return {...state, selectedArray: action.payload};
    case "change_loading":
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
