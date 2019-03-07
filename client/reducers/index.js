import { combineReducers } from 'redux';

import businessReducer from './businessReducer';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  business: businessReducer,
});

// make the combined reducers available for import
export default reducers;
