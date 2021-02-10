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
    default:
      return state;
  }
}
