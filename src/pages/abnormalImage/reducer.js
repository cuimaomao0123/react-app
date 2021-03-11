export default function reducer(state, action) {
  switch(action.type) {
    case "change_page_num":
      return {...state, pageNum: action.payload};
    case "change_page_size":
      return {...state, size: action.payload};
    case "change_total":
      return {...state, total: action.payload};
    case "change_list":
      return {...state, list: action.payload};
    case "change_select_list":
      return {...state, selectList: action.payload};
    case "change_site_id":
      return {...state, siteId: action.payload};
    case "change_start_time":
      return {...state, startTime: action.payload};
    case "change_end_time":
      return {...state, endTime: action.payload};
    case "change_id":
      return {...state, id: action.payload};
    case "change_timer":
      return {...state, timer: action.payload};
    case "change_loading":
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
