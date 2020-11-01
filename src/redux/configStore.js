import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

// import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './reducers';

export const history = createBrowserHistory();

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

function configureStore() {
  return createStore(
    reducers,
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  );
}

export const store = configureStore();
