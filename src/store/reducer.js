import { combineReducers } from 'redux-immutable';

import { reducer as menuReducer} from '@/pages/main/store/reducer'

const cReducer = combineReducers({
  menuData: menuReducer
});

export default cReducer;