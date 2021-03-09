export default function reducer(state, action) {
  switch(action.type) {
    case "add_list":
      return {...state, data: action.payload};
    case "add_selection":
      return {...state, selection: action.payload};
    case "change_total":
      return {...state, total: action.payload};
    case "change_page":
      return {...state, current: action.payload};
    case "change_page_size":
      return {...state, size: action.payload};
    case "change_y":
      return {...state, y: action.payload};
    case "change_loading":
      return {...state, loading: action.payload};
    case "change_is_show":
      return {...state, isShow: action.payload};
    case "change_name":
      return {...state, name: action.payload};
    case "change_timer":
      return {...state, timer: action.payload};
    case "change_edit_show":
      return {...state, editShow: action.payload};
    case "change_edit_obj":
      return {...state, editObj: action.payload};
    case "change_start_time":
      return {...state, startTime: action.payload};
    case "change_end_time":
      return {...state, endTime: action.payload};
    default:
      return state;
  }
}
