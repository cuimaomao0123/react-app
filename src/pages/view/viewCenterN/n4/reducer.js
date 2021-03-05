export default function reducer(state, action) {
  switch(action.type) {
    case "change_select_array":
      return {...state, selectArray: action.payload};
    case "change_facility":
      return {...state, facility: action.payload};
    default:
      return state;
  }
}
