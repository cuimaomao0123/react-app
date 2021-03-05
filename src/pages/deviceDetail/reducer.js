export default function reducer(state, action) {
  switch(action.type) {
    case "change_page_num":
      return {...state, pageNum: action.payload};
    case "change_size":
      return {...state, size: action.payload};
    case "change_list":
      return {...state, list: action.payload};
    case "change_total":
      return {...state, total: action.payload};
    case "change_selection_key":
      return {...state, selectionKey: action.payload};
    case "change_loading":
      return {...state, loading: action.payload};
    case "change_timer":
      return {...state, timer: action.payload};
    case "change_columns":
      return {...state, columns: action.payload};
    case "change_is_show":
      return {...state, isShow: action.payload};
    case "change_edit_obj":
      return {...state, editObj: action.payload};
    default:
      return state;
  }
}
