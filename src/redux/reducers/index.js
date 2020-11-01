import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import main from './main';

const appReducer = combineReducers({
  router: routerReducer,
  main
});

export default (state, action) => {
  return appReducer(state, action);
};
