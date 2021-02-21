export default function reducer(state, action) {
  switch(action.type) {
    case "change_select_list":
      return {...state, selectList: action.payload}; 
    case "change_sex":
      return {...state, sex: action.payload};
    case "change_site_id":
      return {...state, siteId: action.payload}; 
    case "change_age":
      return {...state, age: action.payload}; 
    case "change_name":
      return {...state, name: action.payload}; 
    case "change_heat":
      return {...state, heat: action.payload}; 
    case "change_address":
      return {...state, address: action.payload}; 
    case "change_identity":
      return {...state, identity: action.payload}; 
    case "change_iphone":
      return {...state, iphone: action.payload}; 
    case "change_go_site":
      return {...state, goSite: action.payload}; 
    case "change_state":
      return {...state, state: action.payload}; 
    case "change_contact":
      return {...state, contact: action.payload}; 
    case "change_go":
      return {...state, go: action.payload}; 
    default:
      return state;
  }
}
