import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducers from './reducers/index';
import { checkCookie } from './actions/actions';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(checkCookie());

export default store;