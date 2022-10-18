import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import loginReducer from './reducers/auth';
import { LoginActions } from './actions/login';

export const history = createMemoryHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
});

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export type State = ReturnType<typeof rootReducer>;
export type Actions = LoginActions;

export default createStore(rootReducer, applyMiddleware(thunk));
