export default function reducer(state, action) {
  switch(action.type) {
    case "change_page":
      return {...state, limitPage: action.payload};
    case "change_page_size":
      return {...state, limitCount: action.payload};
    default:
      return state;
  }
}
