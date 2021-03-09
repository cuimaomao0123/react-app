export default function reducer(state, action) {
  switch(action.type) {
    case "change_type_select":
      return {...state, typeSelect: action.payload};
    case "change_device_select":
      return {...state, deviceSelect: action.payload};
    case "change_type_id":
      return {...state, typeId: action.payload};
    case "change_facility_id":
      return {...state, facilityId: action.payload};
    default:
      return state;
  }
}
