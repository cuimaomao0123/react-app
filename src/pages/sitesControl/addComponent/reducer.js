export default function reducer(state, action) {
  switch(action.type) {
    case "change_type_select":
      return {...state, typeSelect: action.payload};
    case "change_device_select":
      return {...state, deviceSelect: action.payload};
    default:
      return state;
  }
}
